import dynamic from "next/dynamic";
import NoSSR from 'react-no-ssr';
const Magic = dynamic(
    () => import('../../components/magic'),
    { ssr: false }
)

const Magica = () => {
    return <div>
        <NoSSR>
            <Magic />
        </NoSSR>
    </div>
}

export default Magica;