import * as bcrypt from 'bcrypt'

export const generatePassword = (rawPassword: string) => {
    const SALT = bcrypt.genSaltSync()
    return bcrypt.hashSync(rawPassword, SALT)
}



// export const comparePassword = (rawPassword: string, hash: string) => {
//     return bcrypt.compareSync(rawPassword, hash)
// }