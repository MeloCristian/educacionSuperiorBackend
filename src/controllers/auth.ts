import { Usuario } from "../models/Usuario";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { BlackListToken } from "../models/BlackListToken";
import { Crypto } from "../lib/Crypto";
import { createLogicalAnd } from "typescript";
const crypto = new Crypto();
const AES_KEY = Buffer.from(process.env.AES_KEY!, "hex");

export const AuthController = {
  async sigin(data: any): Promise<any> {
    let usuario: any = await Usuario.findOne({
      where: {
        email_us: data.email_us,
      },
    });

    usuario = usuario?.toJSON()
    let datos = `${usuario.id_usuario},${usuario.email_us}`

    try {
      if (usuario) {
        let pasa = bcrypt.compareSync(data.pass_us, usuario.pass_us);
        if (pasa) {
          let user = crypto.aesEncrypt(datos, AES_KEY);
          if (user === null) {
            console.log("pasa");

            return null;
          }
          const token = jwt.sign(
            {
              user,
              ok: true,
            },
            process.env.SEED_USER!,
            {
              expiresIn: process.env.EXPIRED_USER,
            }
          );
          return {
            sigin: true,
            token,
            id: usuario.id_usuario
          };
        }
      }
    } catch (error) {
      return null;
    }
  },

  async verificarToken(req: any, res: any, next: any) {
    try {
      const { authorization } = req.headers;
      console.log(authorization);

      if (!authorization) {
        res.status(500).send('Error de utenticacion');
        return;
      }
      let token = authorization.split(" ")[1];


      jwt.verify(token, process.env.SEED_USER!, (error: any, decoded: any) => {
        if (error) {
          res.status(500).json({
            caducada: true,
          });
          return
        }

        let user = decoded.user
        user = crypto.aesDecrypt(user, AES_KEY, 'utf8')
        user = {
          id_usuario: user.split(',')[0],
          email_us: user.split(',')[1]
        }
        req.body.user = user
        next();
      });
    } catch (error) {
      console.log(error);

    }

  },

  verificaSesion(req: any, res: any) {
    const { authorization } = req.headers;
    if (!authorization) {
      res.status(500);
      return;
    }
    let token = authorization.split(" ")[1];


    jwt.verify(token, process.env.SEED_USER!, (error: any, decoded: any) => {
      if (error) {
        return res.status(500).json({
          sessionActiva: false,
        });
      }
      const token = jwt.sign(
        {
          user: decoded.user,
          ok: true,
        },
        process.env.SEED_USER!,
        {
          expiresIn: process.env.EXPIRED_USER,
        }
      );
      res.status(200).json({
        sigin: true,
        token,
      })
    });
  },

  disposeToken(token: any): Promise<any> {
    return BlackListToken.blackList(token, process.env.SEED_USER);
  },
};
