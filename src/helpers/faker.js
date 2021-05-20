// Module imports
import faker from 'faker'





// Local variables
let isSeedSet = false





if (!isSeedSet) {
	faker.seed(1234567890)
	isSeedSet = true
}





export { faker }
