import { waveform } from 'ldrs'
waveform.register()

type LoaderProps = {
    size?: string
    stroke?: string
    speed?: string
    color?: string
}

function HatchLoader({ size = "28", stroke = "4", speed = "3.5", color = "white" }: LoaderProps) {
    // Default values shown
    return <l-waveform
        size={size}
        stroke={stroke}
        speed={speed}
        color={color}
    ></l-waveform>
}

export default HatchLoader;