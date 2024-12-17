import useStore from "../../app/store";
import GetDomestic from "./getDomestic/GetDomestic";

export default function ShippingOptions () {
    const domestic = useStore((state) => state.domestic);

    return (
        <GetDomestic/>
    )
}