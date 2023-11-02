import HashLoader from "react-spinners/HashLoader";

export default function LoadingWidget() {

    return (
        <div className="mt-32 w-3/4 h-[250px] mx-auto relative flex justify-center items-center gap-4">
            <HashLoader />
            <span className="logoFont text-4xl">Fanilo Tour</span>
        </div>
    )
}