import {mutation, query} from './_generated/server'

export const saveSketch = mutation(
   async ({db}, {prompt}: {prompt:string}) => {
        console.log('saving sketch', prompt)
        await db.insert("sketches",{
            prompt,
         
        })

        return {
            message: 'saved sketch'
        }
    }
)

export const getSketches = query(
    async ({db}) => {
        const sketches = await db.query("sketches").collect()
        return sketches
    }
)