import { Curso } from "../../cursos/models";
import { User } from "../../users/models";

export interface Inscripcion{
    id:string;
    cursoId:string;
    userId:string;
    user?:User;
    curso?:Curso;
    createdAt:Date;
}