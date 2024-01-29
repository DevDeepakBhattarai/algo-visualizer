type Bar = {
  value: number;
  id: string;
  color: string;
};

type Algorithms =
  | "merge"
  | "bubble"
  | "count"
  | "quick"
  | "insertion"
  | "selection";

type Sound = "ding" | "windchime" | "scale";

declare const DrawerWithHandle: {
  Root: typeof Root;
  NestedRoot: typeof NestedRoot;
  Content: React.ForwardRefExoticComponent<
    Omit<
      DialogPrimitive.DialogContentProps & React.RefAttributes<HTMLDivElement>,
      "ref"
    > & {
      onAnimationEnd?: (open: boolean) => void;
      handleVisible?: boolean;
    } & React.RefAttributes<HTMLDivElement>
  >;
  Overlay: React.ForwardRefExoticComponent<
    Omit<
      DialogPrimitive.DialogOverlayProps & React.RefAttributes<HTMLDivElement>,
      "ref"
    > &
      React.RefAttributes<HTMLDivElement>
  >;
  Trigger: React.ForwardRefExoticComponent<
    DialogPrimitive.DialogTriggerProps & React.RefAttributes<HTMLButtonElement>
  >;
  Portal: React.FC<DialogPrimitive.DialogPortalProps>;
  Close: React.ForwardRefExoticComponent<
    DialogPrimitive.DialogCloseProps & React.RefAttributes<HTMLButtonElement>
  >;
  Title: React.ForwardRefExoticComponent<
    DialogPrimitive.DialogTitleProps & React.RefAttributes<HTMLHeadingElement>
  >;
  Description: React.ForwardRefExoticComponent<
    DialogPrimitive.DialogDescriptionProps &
      React.RefAttributes<HTMLParagraphElement>
  >;
};
