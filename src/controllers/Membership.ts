import sequelize from 'sequelize';
import { Membership } from '../models/Membership';
import { Persona } from '../models/Persona'

export const MembershipController = {

    getBypk(id: number): Promise<Membership | null> {
        return Membership.findByPk(id);
    },

    addMembership(transaction?: sequelize.Transaction): Promise<Membership> {
        try {
            let membershipStart = Date.now();
            let membershipEnd = Date.now() + 2.628e+9
            let membresia = {
                startAt: new Date(membershipStart),
                endAt: new Date(membershipEnd)
            } as Membership
            return Membership.create(membresia, transaction == null ? {} : {
                transaction: transaction
            })
        } catch (error) {
            transaction?.rollback();
            throw error;
        }

    },
}