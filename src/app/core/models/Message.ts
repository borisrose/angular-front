export interface Message {
    mainIdea: string;
    content: string | number;
    type:"2-data" | "notification" | "popup";
}