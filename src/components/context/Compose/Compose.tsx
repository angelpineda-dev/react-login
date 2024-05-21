
interface Props {
    components: Array<any>
    children: React.ReactNode
}

export default function Compose({components = [], children}: Props) {

    return (
        <>
            {components.reduceRight((acc, Comp) => {
                return <Comp>{acc}</Comp>
            }, children)}
        </>
    )
}