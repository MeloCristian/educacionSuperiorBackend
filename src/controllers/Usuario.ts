import { Usuario } from '../models/Usuario'
import bcrypt from 'bcrypt'
import { Persona } from '../models/Persona';
import { sequelize } from "../sequelize";
import { PersonaController } from './Persona';
import { MembershipController } from './Membership';

export const UsuarioController = {

    getBypk(id_usuario: string): Promise<Usuario | null> {
        return Usuario.findByPk(id_usuario);
    },

    async addUser(user: Usuario, persona: Persona): Promise<any> {
        user.pass_us = bcrypt.hashSync(user.pass_us, 5)
        const t = await sequelize.transaction();
        try {
            let person = await PersonaController.addPersona(persona, t)
            let membership = await MembershipController.addMembership(t)
            user.id_persona = person.id_persona;
            user.id_membership = membership.id_membership;
            let reps = await Usuario.create(user, { transaction: t });
            await t.commit();
            return reps;
        } catch (error) {
            t.rollback();
            throw error
        }
    },
}