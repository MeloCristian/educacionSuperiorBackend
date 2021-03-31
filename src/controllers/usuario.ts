import {Usuario} from '../models/Usuario'
import bcrypt from 'bcrypt'

export const UsuarioController = {

    getBypk(id_usuario: string): Promise<Usuario | null>{
        return Usuario.findByPk(id_usuario);
    },

    addUser(user:Usuario): Promise<any>{
        user.pass_us=bcrypt.hashSync(user.pass_us, 5)
        user.id_rol=1;
        return Usuario.create(user)
    },
}