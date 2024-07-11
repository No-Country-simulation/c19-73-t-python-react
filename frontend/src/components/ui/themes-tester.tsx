import { Button } from "./button";

export const ThemesTester = () => {
  return (
    <>
      <div className="flex justify-between p-4 bg-background text-background-foreground">
        <h1 className="text-3xl font-bold underline">Default</h1>
        <Button>Default Button</Button>
      </div>
      <div className="flex justify-between p-4 bg-primary text-primary-foreground">
        <h1 className="text-3xl font-bold underline">Primary</h1>
        <Button variant={"secondary"}>Secondary Button</Button>
      </div>
      <div className="flex justify-between p-4 bg-secondary text-secondary-foreground">
        <h1 className="text-3xl font-bold underline">Secondary</h1>
        <Button variant={"outline"}>Outline Button</Button>
      </div>
      <div className="flex justify-between p-4 bg-popover text-popover-foreground">
        <h1 className="text-3xl font-bold underline">Pop Over</h1>
        <Button variant={"ghost"}>Ghost Button</Button>
      </div>
      <div className="flex justify-between p-4 bg-card text-card-foreground">
        <h1 className="text-3xl font-bold underline">Card</h1>
        <Button variant={"link"}>Link Button</Button>
      </div>
      <div className="flex justify-between p-4 bg-muted text-muted-foreground">
        <h1 className="text-3xl font-bold underline">Muted</h1>
        <Button disabled>Default Button Disabled</Button>
      </div>
      <div className="flex justify-between p-4 bg-accent text-accent-foreground">
        <h1 className="text-3xl font-bold underline">Accent</h1>
        <Button variant={"destructive"}>Destructive Button</Button>
      </div>
      <div className="flex justify-between p-4 bg-destructive text-destructive-foreground">
        <h1 className="text-3xl font-bold underline">Destructive</h1>
        <Button variant={"secondary"} disabled>
          Secondary Button Disabled
        </Button>
      </div>
    </>
  );
};
