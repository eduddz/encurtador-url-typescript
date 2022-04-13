import { Request, Response } from "express";
import shortid from "shortid";
import { config } from "../config/Constants";
import { URLModel } from "../model/URL";


export class URLController {
    public async shorten(req: Request, res: Response): Promise<void> {
        // Ver se URL já existe
        const { originURL } = req.body;
        const url = await URLModel.findOne({ originURL })
        if(url) {
            res.json(url);
            return;
        }

        // Criar o hash para a URL
        const hash = shortid.generate();
        const shortURL = `${config.API_URL}/${hash}`;
        
        // Salvar a URL no banco
        const newURL = await URLModel.create({ hash, shortURL, originURL })

        // Retornar a URL salva
        res.json(newURL)
    }

    public async redirect(req: Request, res: Response): Promise<void> {
        // Pegar hash da url
        const { hash } = req.params;
        
        // Encontrar a URL original
        const url = await URLModel.findOne({ hash })
        if(url) {
            // Redirecionar para a URL original a partir do banco de dados
            res.redirect(url.originURL);
            return;
        }

        res.status(400).json({ error: "URL not found" });

    }
}