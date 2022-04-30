import sequelize from 'sequelize';
import { Persona } from '../models/Persona'

export const PersonaController = {

    getBypk(id_persona: string): Promise<Persona | null> {
        return Persona.findByPk(id_persona);
    },

    addPersona(persona: Persona, transaction?: sequelize.Transaction): Promise<Persona> {
        try {
            return Persona.create(persona, transaction == null ? {} : {
                transaction: transaction
            })
        } catch (error) {
            transaction?.rollback()
            throw error
        }
    },
}