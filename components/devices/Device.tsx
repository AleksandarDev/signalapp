import { Box, ButtonBase, Grid, Paper, Typography } from "@material-ui/core";
import BorderAllIcon from '@material-ui/icons/BorderAll';
import BorderVerticalIcon from '@material-ui/icons/BorderVertical';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import HelpIcon from '@material-ui/icons/Help';
import LocalFloristIcon from '@material-ui/icons/LocalFlorist';
import LockIcon from '@material-ui/icons/Lock';
import PowerIcon from '@material-ui/icons/Power';
import PowerOffOutlinedIcon from '@material-ui/icons/PowerOffOutlined';
import TouchAppIcon from '@material-ui/icons/TouchApp';
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent';
import WbIncandescentOutlinedIcon from '@material-ui/icons/WbIncandescentOutlined';
import React, { useEffect, useRef, useState } from "react";
import TimeAgo from 'react-timeago';
import { Area, AreaChart } from "recharts";
import ConductsService from "../../src/conducts/ConductsService";
import { IDeviceContact, IDeviceContactState, IDeviceModel } from "../../src/devices/Device";
import DevicesRepository from "../../src/devices/DevicesRepository";
import HttpService from "../../src/services/HttpService";

export interface IDeviceProps {
    deviceModel?: IDeviceModel,
    inline?: boolean,
    displayConfig: IDeviceWidgetConfig
}

export interface IHistoricalValue {
    timeStamp: Date;
    value?: any;
}

export interface IDeviceWidgetConfig {
    room?: string;
    icon?: "light" | "socket" | "motion" | "window" | "doors" | "switch" | "airquality"
    displayName?: string;
    activeChannelName?: string;
    activeContactName?: string;
    activeContactNegated: boolean;
    actionContactName?: string;
    actionChannelName?: string;
    lastActivity: boolean;
    displayValues?: IDeviceWidgetValueDisplayConfig[];
}

function colorTemperatureToRGB(kelvin: number) {
    var temp = kelvin / 100;
    var red, green, blue;
    if (temp <= 66) {
        red = 255;
        green = temp;
        green = 99.4708025861 * Math.log(green) - 161.1195681661;
        if (temp <= 19) {
            blue = 0;
        } else {
            blue = temp - 10;
            blue = 138.5177312231 * Math.log(blue) - 305.0447927307;
        }
    } else {
        red = temp - 60;
        red = 329.698727446 * Math.pow(red, -0.1332047592);
        green = temp - 60;
        green = 288.1221695283 * Math.pow(green, -0.0755148492);
        blue = 255;
    }

    return {
        r: clamp(red, 0, 255),
        g: clamp(green, 0, 255),
        b: clamp(blue, 0, 255)
    }
}

function clamp(x: number, min: number, max: number) {
    if (x < min) { return min; }
    if (x > max) { return max; }
    return x;
}

async function getDeviceStateAsync(deviceIdentifier: string, contact: IDeviceContact) {
    return {
        contact: contact,
        value: null
    };
    // TODO: Implement
    // return await HttpService.getAsync(`http://192.168.0.20:5000/beacon/device-state?identifier=${deviceIdentifier}&contact=${contact.name}`)
    //     .then<IDeviceContactState>(v => {
    //         return {
    //             contact: contact,
    //             value: v
    //         };
    //     });
}

export interface IDeviceWidgetValueDisplayConfig {
    contactName: string;
    units?: string;
}

export interface IDeviceWidgetValueDisplayProps {
    deviceIdentifier: string;
    config: IDeviceWidgetValueDisplayConfig;
}

const DeviceWidgetValueDisplay = (props: IDeviceWidgetValueDisplayProps) => {
    const { contactName, units } = props.config;
    const { deviceIdentifier } = props;
    const [isLoading, setIsLoading] = useState(true);
    const [displayValue, setDisplayValue] = useState<any>(undefined);
    const displayValueRef = useRef(displayValue);
    displayValueRef.current = displayValue;

    // const refreshDisplayValueAsync = async () => {
    //     try {
    //         const state = await getDeviceStateAsync(deviceIdentifier, { name: contactName });

    //         let newState = state.value;
    //         if (newState === displayValueRef.current) return;

    //         setDisplayValue(newState);

    //         console.log('Device state change', deviceIdentifier, state.contact.name, state.contact.dataType, "Value: ", state.value, `(${typeof state.value})`)
    //     } finally {
    //         setIsLoading(false);
    //         setTimeout(refreshDisplayValueAsync, 2000);
    //     }
    // };

    useEffect(() => {
        // if (isLoading) {
        //     setTimeout(() => {
        //         refreshDisplayValueAsync();
        //     }, 100);
        // }
    }, []);

    return (
        <Box sx={{ px: 1 }}>
            <Typography variant="caption" color="textSecondary">{`${(displayValue || "Unknown")}${units || ""}`}</Typography>
        </Box>
    );
};

const Device = (props: IDeviceProps) => {
    const [historicalData, setHistoricalData] = useState<IHistoricalValue[]>([]);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [lastActivityTimeStamp, setLastActivityTimeStamp] = useState<Date | undefined>(undefined);
    const [deviceModel, setDeviceModel] = useState<IDeviceModel>();

    const displayConfig = props.displayConfig;

    const getState = (channel: string, contact: string) => {
        return deviceModel?.states.filter(s =>
            s.channel === channel && s.name === contact)[0];
    }

    const refreshActiveAsync = async () => {
        if (!deviceModel?.identifier ||
            typeof displayConfig.activeContactName === "undefined" ||
            typeof displayConfig.activeChannelName === "undefined")
            return;

        try {
            const state = getState(displayConfig.activeChannelName, displayConfig.activeContactName);
            const contact = deviceModel.endpoints
                .filter(e => e.channel === displayConfig.activeChannelName)[0]
                .contacts.filter(c => c.name === displayConfig.activeContactName)[0];
            if (state == null || contact == null) {
                console.warn("State not found for", deviceModel.alias, displayConfig.activeChannelName, displayConfig.activeContactName, deviceModel.states);
                return;
            }

            console.log("Refreshing state for", deviceModel.alias, contact.name, state.valueSerialized, state.timeStamp);

            let newState = false;
            if (contact.dataType === "bool") {
                newState = `${state.valueSerialized}`.toLowerCase() === 'true';
            }

            if (displayConfig.activeContactNegated)
                newState = !newState;

            setIsActive(newState);
            setLastActivityTimeStamp(state.timeStamp);
        } catch (error) {
            console.warn(error);
        }
    };

    // const loadHistoricalDataAsync = async () => {
    //     if (masterEndpoint?.length) {
    //         const doubleContacts = masterEndpoint[0].inputs?.filter(ci => ci.dataType === "double" && ci.name !== "battery" && ci.name !== "linkquality");
    //         if (doubleContacts?.length) {
    //             setInterval(async () => {
    //                 try {
    //                     const contactName = doubleContacts[0].name;
    //                     const startTimeStamp = new Date(new Date().getTime() - 60 * 60 * 1000);
    //                     var data = (await HttpService.getAsync(`http://192.168.0.20:5000/beacon/device-state-history?identifier=${props.deviceConfiguration?.identifier}&contact=${contactName}&startTimeStamp=${startTimeStamp.toISOString()}&endTimeStamp=${new Date().toISOString()}`)) as IHistoricalValue[];
    //                     if (data) {
    //                         setHistoricalData(data.map(d => { return { timeStamp: d.timeStamp, value: d.value / 10 }; }));
    //                     }
    //                 } catch (error) {
    //                     console.warn("Failed to load historical data for device ", props.deviceModel?.identifier);
    //                 }
    //             }, 10000);
    //         }
    //     }
    // };

    useEffect(() => {
        // loadHistoricalDataAsync();

        // return () => {
        //     if (refreshActionTimeoutClearRef.current) {
        //         console.log("cleared timeout ref", refreshActionTimeoutClearRef.current);
        //         clearTimeout(refreshActionTimeoutClearRef.current);
        //     }
        // }

        const loadDevice = async () => {
            if (typeof props.deviceModel === 'undefined') {
                console.warn("Unable to load device, provided device model is undefined.");
                return;
            }

            const device = await DevicesRepository.getDeviceAsync(props.deviceModel.id);
            if (typeof device === 'undefined') {
                console.warn("Failed to retrieve device with id", props.deviceModel.id)
                return;
            }

            // Set device
            setDeviceModel(device);
        }

        loadDevice();
    }, []);

    useEffect(() => {
        if (typeof deviceModel === 'undefined') return;

        // Attach to contact changes
        if (typeof displayConfig.activeChannelName !== 'undefined' &&
            typeof displayConfig.activeContactName !== 'undefined') {
            const contact = deviceModel?.states.filter(s => s.channel === displayConfig.activeChannelName &&
                s.name === displayConfig.activeContactName)[0];
            if (contact) {
                contact.onChanged(refreshActiveAsync);
            }
        }

        refreshActiveAsync();
    }, [deviceModel])

    const handleOutputContact = async () => {
        if (typeof displayConfig.actionChannelName === 'undefined' ||
            typeof displayConfig.actionContactName === 'undefined' ||
            typeof props.deviceModel?.id === 'undefined')
            return;

        // Retrieve current boolean state
        const currentState = getState(displayConfig.actionChannelName, displayConfig.actionContactName);
        if (typeof currentState === 'undefined')
            return;

        var newState = !(`${currentState.valueSerialized}`.toLowerCase() === 'true');
        await ConductsService.RequestConductAsync({
            deviceId: props.deviceModel.id,
            channelName: displayConfig.actionChannelName,
            contactName: displayConfig.actionContactName
        }, newState);

        currentState.valueSerialized = newState.toString();
        refreshActiveAsync();
    };

    const iconsMap = {
        "light": [WbIncandescentOutlinedIcon, WbIncandescentIcon],
        "socket": [PowerOffOutlinedIcon, PowerIcon],
        "motion": [DirectionsRunIcon, DirectionsRunIcon],
        "window": [BorderVerticalIcon, BorderAllIcon],
        "doors": [BorderVerticalIcon, LockIcon],
        "switch": [TouchAppIcon, TouchAppIcon],
        "airquality": [LocalFloristIcon, LocalFloristIcon],
        "unknown": [HelpIcon, HelpIcon]
    }

    const IconComponent = iconsMap[displayConfig.icon || "unknown"][isActive ? 1 : 0];
    const displayName = displayConfig?.displayName || props.deviceModel?.alias;
    const ActionComponent = typeof displayConfig.actionContactName !== "undefined" ? ButtonBase : React.Fragment;
    const actionComponentProps = typeof displayConfig.actionContactName !== "undefined" ? { onClick: () => handleOutputContact() } : {};

    let backgroundColor = undefined;
    let color = undefined;
    if (isActive) {
        backgroundColor = "rgba(255, 187, 109, 1)"; // 3000K temp default
        color = "#333";
        // const colorTempK = contactValue({ name: "color_temp", dataType: "double" });
        // if (typeof colorTempK?.value === "number") {
        //     const { r, g, b } = colorTemperatureToRGB(colorTempK.value);
        //     backgroundColor = `rgba(${r}, ${g}, ${b}, 0.7`;
        // }
    }

    const showDiagram = false;

    return (
        <Paper style={{ backgroundColor: backgroundColor, color: color }}>
            <ActionComponent {...actionComponentProps}>
                <Box sx={{ width: 220 }}>
                    <Grid container direction="row" justifyContent="space-between" alignItems={props.inline ? "center" : "flex-start"}>
                        <Grid item xs={12} zeroMinWidth>
                            <Box sx={{ py: 1, pr: 2, pl: 1, display: "flex", alignItems: "center" }}>
                                {IconComponent && (
                                    <Box sx={{ mr: 1, height: 35 }}>
                                        <IconComponent fontSize="large" />
                                    </Box>
                                )}
                                <Typography variant="body2" noWrap>{displayName || "Unknown"}</Typography>
                            </Box>
                        </Grid>
                        {displayConfig.displayValues && displayConfig.displayValues.map(dvconfig => (
                            <Grid item xs={12} key={`displayValue-${props.deviceModel?.identifier}-${dvconfig.contactName}`}>
                                <DeviceWidgetValueDisplay config={dvconfig} deviceIdentifier={props.deviceModel!.identifier!} />
                            </Grid>
                        ))}
                        {displayConfig.lastActivity &&
                            <Grid item>
                                <Box sx={{ px: 1 }}>
                                    <Typography variant="caption" style={{ color: color, opacity: 0.7 }}>
                                        {"Last activity "}
                                        {lastActivityTimeStamp
                                            ? <TimeAgo date={lastActivityTimeStamp} live />
                                            : "not recorded"}

                                    </Typography>
                                </Box>
                            </Grid>}
                        {showDiagram && (
                            <Grid item>
                                <AreaChart width={220} height={40} data={historicalData} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                                    <Area type="basis" dataKey="value" dot={false} fill="#ffffff" fillOpacity={0.1} stroke="#aeaeae" strokeWidth={2} />
                                </AreaChart>
                            </Grid>
                        )}
                    </Grid>
                </Box>
            </ActionComponent>
        </Paper>
    );
};

export default Device;