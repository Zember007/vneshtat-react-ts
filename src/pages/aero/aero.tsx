import {AeroContent} from "@/widgets/aero/aero-content";
import {AeroOperations, AeroNavigations} from "@/widgets/aero/aero-operations";
import Layout from "@/app/layouts/layout";

const Aero = () => {

    return (
        <Layout 
        component={
            <AeroContent />            
        }
        information={
            <AeroOperations />
        }
        navigation={
            <AeroNavigations />
        }

        extraClassBar="!w-[255px] !min-w-[255px]"
        
        />
    )
};

export default Aero;