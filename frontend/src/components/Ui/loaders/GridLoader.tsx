import { grid } from 'ldrs'
grid.register()

type LoaderProps = {
    size?: string
    stroke?: string
    speed?: string
    color?: string
}

function GridLoader({ size = "75", speed = "1.5", color = "white" }: LoaderProps) {
    // Default values shown
    return <l-grid
        size={size}
        speed={speed}
        color={color}
    ></l-grid>
}

export default GridLoader;