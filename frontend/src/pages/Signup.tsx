import { Quote } from "../components/Quote";
import { SIgnupComponent } from "../components/SignupComponent";

export const Signup = () => {
  return (
    <div className="grid grid-cols-2">
      <SIgnupComponent />
      <Quote />
    </div>
  );
};
