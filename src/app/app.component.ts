import { FrequenciaService } from "./frequencia.service";
import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

@Component({
	selector: "app-root",
	templateUrl: "app.component.html",
	styleUrls: ["app.styles.css"],
})
export class AppComponent implements OnInit {
	turmas: Array<any> = [];
	alunos: Array<any> = [];
	registros: Array<any> = [];
	turma = null;
	aluno = null;
	frequencia = null;
	nota1 = null;
	nota2 = null;

	constructor(private service: FrequenciaService) {}

	ngOnInit(): void {
		this.service.lista().subscribe((dados: any) => (this.turmas = dados));
	}

	atualizaAlunos() {
		this.turmas.find((t) => {
			if (t.numero == this.turma) {
				this.alunos = t.alunos;
			}
		});
	}
	salvar(form: NgForm) {
		this.registros.push({
			numeroTurma: this.turma,
			codigoAluno: this.aluno,
			frequencia: this.frequencia,
			nota1: this.nota1,
			nota2: this.nota2,
		});
		this.redefinir();
		form.reset();
	}

	redefinir() {
		this.turma = null;
		this.aluno = null;
		this.nota1 = null;
		this.nota2 = null;
		this.frequencia = null;
	}

	encontrarTurma(numeroTurma) {
		let turma = this.turmas.find((t) => t.numero == numeroTurma);
		return `${turma.numero} - ${turma.nome}`;
	}
	encontrarAluno(codigoAluno) {
		let aluno = null;
		this.turmas.find((t) => {
			t.alunos.find((a) => {
				if (a.codigo == codigoAluno) {
					console.log(a);
					aluno = a;
				}
			});
		});

		return `${aluno.codigo} - ${aluno.nome}`;
	}

	calcularMedia(nota1, nota2) {
		return ((nota1 + nota2) / 2).toFixed(1);
	}

	checarNaN(media) {
		if (isNaN(media)) {
			return 0;
		} else {
			return media;
		}
	}

	calcularFrequenciaMedia() {
		let frequencias = this.registros.reduce((a, b) => a + b.frequencia, 0);
		let media = parseFloat((frequencias / this.registros.length).toFixed(1));
		return this.checarNaN(media);
	}
	calcularNota1Media() {
		let nota1 = this.registros.reduce((a, b) => a + b.nota1, 0);
		let media = parseFloat((nota1 / this.registros.length).toFixed(1));
		return this.checarNaN(media);
	}
	calcularNota2Media() {
		let nota2 = this.registros.reduce((a, b) => a + b.nota2, 0);
		let media = parseFloat((nota2 / this.registros.length).toFixed(1));
		return this.checarNaN(media);
	}
}
