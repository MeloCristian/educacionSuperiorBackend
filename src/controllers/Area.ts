import sequelize from 'sequelize';
import { Area } from '../models/Area';

export const AreaController = {

    getBypk(id: number): Promise<Area | null> {
        return Area.findByPk(id);
    },

    getAll(): Promise<Area[]> {
        return Area.findAll();
    },
}