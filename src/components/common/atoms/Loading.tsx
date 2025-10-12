const Loading = () => {
    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <div className="flex flex-col items-center gap-4">
                <div className="flex gap-2">
                    <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <div className="w-3 h-3 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-3 h-3 bg-primary rounded-full animate-bounce" />
                </div>
                <p className="text-lg">読み込み中...</p>
            </div>
        </div>
    );
};

export default Loading;
