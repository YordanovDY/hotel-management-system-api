export default function throttlingUtil() {
    return new Promise<void>((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 600);
    })
}