import { PetFamilyModal } from "../../components";

export default {
    family: {
        setTitle: (petName) => `Thông tin nguồn giống của ${petName}`,
        setContent: (props) => <PetFamilyModal {...props} />
    }
}