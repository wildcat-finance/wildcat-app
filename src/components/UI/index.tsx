import { Button, Input } from '../ui-components'

export const UI = () => {
    return (
        <>
            <div>
                <Button variant="green">Green</Button>
            </div>
            <div>
                <Button variant="blue">Blue</Button>
            </div>
            <br />
            <div>
                <Input value='123' />
            </div>
        </>
    )
}