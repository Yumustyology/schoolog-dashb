import showToast from "./toast";

const copyText = async (text:string) => {
    try {
        await navigator.clipboard.writeText(text);
        showToast("Copied!",`copied-text-${text}`,{
            type:"success"
        });
    } catch (error:any) {
        showToast('Copy failed!', `copy-failed-${error}`,{
            type: "error"
        });
        console.error(error.message);
    }
};

export default copyText;
