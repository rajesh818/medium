import { Quote } from "../components/Quote";
import { SIgninComponent } from "../components/SIgninComponent";

export const Signin = () => {
  return (
    <div className="grid grid-cols-2">
      <SIgninComponent />
      <Quote />
    </div>
  );
};
