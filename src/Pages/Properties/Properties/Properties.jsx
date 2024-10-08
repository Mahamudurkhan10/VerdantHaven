import ExtraSection from "../../Shared/ExtraSection/ExtraSection";
import DiscoverProperty from "../DiscoverProperty/DiscoverProperty";
import DreamProperty from "../DreamProperty/DreamProperty";
import MakeIt from "../MakeIt/MakeIt";


const Properties = () => {
     return (
          <div className="text-gray-200">
               <DreamProperty></DreamProperty>
               <DiscoverProperty></DiscoverProperty>
               <MakeIt></MakeIt>
               <ExtraSection></ExtraSection>
               
          </div>
     );
};

export default Properties;