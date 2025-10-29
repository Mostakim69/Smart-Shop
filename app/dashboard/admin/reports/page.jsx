import StockAlert from "./components/StockAlert";
import OrderSummary from "./components/OrderSummary";
import SalesOverView from "./components/SalesOverView";

export default function ReportsPage() {
  return (
    <div className="space-y-6 p-6">
      <SalesOverView />
      <OrderSummary/>
      <StockAlert/>
    </div>
  );
}