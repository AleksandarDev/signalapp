import { IconButton, Button } from "@material-ui/core";
import IAutoAction from "../interfaces/IAutoAction";
import { useState } from "react";
import HttpService from "../../../src/services/HttpService";

export interface IAutoActionButtonProps {
  action: IAutoAction;
}

export default function AutoActionButton(props: IAutoActionButtonProps) {
  const { action } = props;
  const [isExecuting, setIsExecuting] = useState(false);

  const triggerAction = async (action: IAutoAction) => {
    if (action.method == null)
      throw new Error("Method is required for triggering action via request.");

    setIsExecuting(true);

    try {
      const response = await HttpService.requestAsync(
        action.url,
        action.method,
        action.data
      );

      if (action.actionCallback) action.actionCallback(response, action);
    } catch (err) {
      // TODO: Dispatch notification
      console.error("Failed to execute AutoAction action", err);
    } finally {
      setIsExecuting(false);
    }
  };

  const isHref = action.url && action.method == null;

  const handleClick = () => {
    if (action.onClick) action.onClick(action);
    if (!isHref) triggerAction(action);
  };

  const commonProps = {
    href: isHref ? action.url : "",
    target: isHref ? "_blank" : undefined,
    onClick: handleClick,
    disabled: isExecuting,
  };

  return action.icon ? (
    <IconButton title={action.label} aria-label={action.label} {...commonProps}>
      {action.icon}
    </IconButton>
  ) : (
    <Button variant="text" {...commonProps}>
      {action.label}
    </Button>
  );
}
