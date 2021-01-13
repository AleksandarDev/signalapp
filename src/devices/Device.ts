export interface IDeviceContact {
    name: string;
    dataType: string;
}

export class DeviceContact implements IDeviceContact {
    name: string;
    dataType: string;

    constructor(name: string, dataType: string)  {
        this.name = name;
        this.dataType = dataType;
    }
}

export interface IDeviceEndpoint {
    channel: string;
    contacts: IDeviceContact[];
}

export class DeviceEndpoint implements IDeviceEndpoint {
    channel: string;
    contacts: IDeviceContact[];

    constructor(channel: string, contacts: IDeviceContact[]) {
        this.channel = channel;
        this.contacts = contacts;
    }
}

export interface IDeviceModel {
    alias: string;
    identifier: string;
    endpoints: IDeviceEndpoint[]
    states: IDeviceContactState[];
}

export class DeviceModel implements IDeviceModel {
    id: string;
    alias: string;
    identifier: string;
    endpoints: IDeviceEndpoint[];
    states: IDeviceContactState[];

    constructor(id: string, alias: string, identifier: string, endpoints: IDeviceEndpoint[], states: IDeviceContactState[]) {
        this.id = id;
        this.alias = alias;
        this.identifier = identifier;
        this.endpoints = endpoints;
        this.states = states;
    }
}

export interface IDeviceContactState {
    name: string;
    channel: string;
    value?: any
    timeStamp: Date;
}

export class DeviceContactState implements IDeviceContactState {
    name: string;
    channel: string;
    value?: any;
    timeStamp: Date;

    constructor(name: string, channel: string, value: any, timeStamp: Date) {
        this.name = name;
        this.channel = channel;
        this.value = value;
        this.timeStamp = timeStamp;
    }
}