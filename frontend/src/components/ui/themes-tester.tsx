import { Button } from './button';

export const ThemesTester = () => {
  return (
    <>
      <div className='text-background-foreground flex justify-between bg-background p-4'>
        <h1 className='text-3xl font-bold underline'>Default</h1>
        <Button>Default Button</Button>
      </div>
      <div className='flex justify-between bg-primary p-4 text-primary-foreground'>
        <h1 className='text-3xl font-bold underline'>Primary</h1>
        <Button variant={'secondary'}>Secondary Button</Button>
      </div>
      <div className='flex justify-between bg-secondary p-4 text-secondary-foreground'>
        <h1 className='text-3xl font-bold underline'>Secondary</h1>
        <Button variant={'outline'}>Outline Button</Button>
      </div>
      <div className='flex justify-between bg-popover p-4 text-popover-foreground'>
        <h1 className='text-3xl font-bold underline'>Pop Over</h1>
        <Button variant={'ghost'}>Ghost Button</Button>
      </div>
      <div className='flex justify-between bg-card p-4 text-card-foreground'>
        <h1 className='text-3xl font-bold underline'>Card</h1>
        <Button variant={'link'}>Link Button</Button>
      </div>
      <div className='flex justify-between bg-muted p-4 text-muted-foreground'>
        <h1 className='text-3xl font-bold underline'>Muted</h1>
        <Button disabled>Default Button Disabled</Button>
      </div>
      <div className='flex justify-between bg-accent p-4 text-accent-foreground'>
        <h1 className='text-3xl font-bold underline'>Accent</h1>
        <Button variant={'destructive'}>Destructive Button</Button>
      </div>
      <div className='flex justify-between bg-destructive p-4 text-destructive-foreground'>
        <h1 className='text-3xl font-bold underline'>Destructive</h1>
        <Button variant={'secondary'} disabled>
          Secondary Button Disabled
        </Button>
      </div>
    </>
  );
};
