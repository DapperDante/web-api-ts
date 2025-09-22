export interface Component {
  component: any;
  connect(): void;
  healthCheck(): Promise<boolean>;
}