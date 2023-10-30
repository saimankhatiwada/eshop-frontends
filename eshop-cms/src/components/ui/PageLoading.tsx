import pageLoading from "../../assets/pageLoading.svg";

function PageLoading() {
    return (
        <div className="h-screen flex items-center justify-center">
            <img src={pageLoading} className="w-10 h-10" />
        </div>
    );
}

export default PageLoading;