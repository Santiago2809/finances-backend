
function ErrorMessage({ message }: { message: string }) {
    return (
        <div className="w-full bg-red-300 py-3 px-1.5 rounded-md">
            <h3 className="text-center text-base text-red-900">{message}</h3>
        </div>
    )
}

export default ErrorMessage;