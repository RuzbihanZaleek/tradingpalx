export type MarginAlert = {
    coinId: string;
    coinSymbol: string;
    alertPrice: number;
    direction: "above" | "below";
    triggered?: boolean;
  };
  
  export const marginAlerts: MarginAlert[] = [];
  