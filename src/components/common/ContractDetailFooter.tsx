import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const ContractDetailFooter = () => {
    return (
        <footer className="bg-background">
            <div className="container mx-auto px-4">
                <Separator className="my-8" />
                <div className="flex flex-col md:flex-row justify-end items-center">
                    <div className="flex md:mt-0">
                        <Button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                            更新
                        </Button>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default ContractDetailFooter;
