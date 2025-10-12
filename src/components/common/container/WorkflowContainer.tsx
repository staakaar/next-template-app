import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsContent, TabsTrigger } from "@/components/ui/tabs";

const WorkflowContainer = () => {
    return (
        <Tabs
            className="mt-6"
            defaultValue="approvalFlow"
        >
            <TabsList>
                <TabsTrigger value="approvalFlow">承認状況</TabsTrigger>
                <TabsTrigger value="workflowSetting">WF設定</TabsTrigger>
            </TabsList>
            {/* 詳細時は更新ボタン */}
            <div className="flex justify-end">
                <Button className="bg-sky-50 hover:bg-sky-100 text-sky-600 font-bold py-2 px-4 rounded hover:shadow-lg transition-all duration-200">
                    更新
                </Button>
            </div>
            <div className="grid gap-3">
                <TabsContent value="approvalFlow">
                    <div>approvalFlow</div>
                </TabsContent>
                <TabsContent value="workflowSetting">
                    <div>workflowSetting</div>
                </TabsContent>
            </div>
        </Tabs>
    );
};

export default WorkflowContainer;
