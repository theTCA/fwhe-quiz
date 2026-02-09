import jsPDF from 'jspdf';
import { images } from '$lib/data.json';
import { asset } from '$app/paths';

const styles = {
	normal: {
		imageSize: { w: 20, h: 20 },
		headlineFontSize: 14,
		preambleFontSize: 8,
		headerFontSize: 7,
		footerFontSize: 7,
		questionFontSize: 10,
		choiceBoxLineWidth: 0.2,
		choiceCrossLineWidth: 0.4,
		choiceCrossSpacing: 1
	},
	xl: {
		imageSize: { w: 25, h: 25 },
		headlineFontSize: 20,
		preambleFontSize: 10,
		headerFontSize: 10,
		footerFontSize: 10,
		questionFontSize: 14,
		choiceBoxLineWidth: 0.4,
		choiceCrossLineWidth: 0.6,
		choiceCrossSpacing: 1.3
	}
};

export class QuizBuilder {
	#doc;
	#margin = { top: 30, left: 20, right: 15, bottom: 15 };
	#y = this.#margin.top;
	/** @type {('normal' | 'xl')} */
	#style = 'normal';
	#questions;
	#showSolution;
	#hasDetails;
	/**
	 * @param {import("$lib/types").Question[]} questions
	 * @param {{style?: 'normal' | 'xl';showSolution?: boolean; hasDetails?: boolean}} options
	 * @param {string} name
	 */
	constructor(
		name,
		questions,
		options = { style: 'normal', showSolution: false, hasDetails: false }
	) {
		this.#doc = new jsPDF({
			orientation: 'portrait',
			unit: 'mm',
			format: 'a4',
			putOnlyUsedFonts: true,
			compress: true
		});
		this.#style = options.style ? options.style : 'normal';
		this.#showSolution = options.showSolution ? options.showSolution : false;
		this.#hasDetails = options.hasDetails;
		this.#questions = questions;
		if (this.#showSolution) {
			this.#addHeadline(`${name} - Lösungen`);
		} else {
			this.#addHeadline(name);
		}
		if (this.#hasDetails) {
			this.#addDetails();
		}
		this.#addPreamble('Es ist immer nur eine Antwortmöglichkeit richtig!');
		for (const [index, question] of questions.entries()) this.#addQuestion(index + 1, question);
		this.#addHeader();
		this.#addFooter();
	}

	#getFontSizeInMM() {
		return this.#doc.getFontSize() / this.#doc.internal.scaleFactor;
	}

	#getMaxTextWidth() {
		return this.#doc.internal.pageSize.getWidth() - (this.#margin.left + this.#margin.right);
	}

	#addPage() {
		this.#doc.addPage();
		this.#y = this.#margin.top;
	}

	/**
	 * @param {string} text
	 * @param {number} [x]
	 * @param {number} [y]
	 */
	#putText(text, x = this.#margin.left, y = this.#y) {
		const splitText = this.#splitText(text);
		this.#doc.text(splitText, x, y);
		this.#y += (splitText.length - 1) * this.#getFontSizeInMM() * this.#doc.getLineHeightFactor();
	}

	/**
	 * @param {string} text
	 */
	#splitText(text) {
		return this.#doc.splitTextToSize(text, this.#getMaxTextWidth() - 10);
	}

	#setBold() {
		this.#doc.setFont(this.#doc.getFont().fontName, 'bold');
	}

	#setNormal() {
		this.#doc.setFont(this.#doc.getFont().fontName, 'normal');
	}

	#setItalic() {
		this.#doc.setFont(this.#doc.getFont().fontName, 'italic');
	}

	/**
	 * @param {number} number
	 * @param {import("$lib/types").Question} question
	 */
	#addQuestion(number, question) {
		const spaceAfterQuestion = 7;
		const spaceAfterQuestionText = 3;
		this.#doc.setFontSize(styles[this.#style].questionFontSize);
		const spaceAfterChoice = this.#getFontSizeInMM();
		const lines = this.#splitText(
			question.question + '\n' + question.choices.reduce((acc, c) => acc + c.text + '\n', '').trim()
		).length;
		const lineHeight = lines * this.#getFontSizeInMM() * this.#doc.getLineHeightFactor();
		if (
			this.#y +
				(spaceAfterQuestion +
					spaceAfterQuestionText +
					spaceAfterChoice * question.choices.length +
					lineHeight) >
			this.#doc.internal.pageSize.getHeight() - this.#margin.bottom
		)
			this.#addPage();
		else this.#y += spaceAfterQuestion;
		this.#setBold();
		const numberText = `${number}. `;
		this.#putText(numberText);
		const padding = this.#doc.getTextWidth(`${this.#questions.length}. `);
		this.#putText(question.question, this.#margin.left + padding);
		this.#setNormal();
		this.#y += spaceAfterQuestionText;
		const imageSize = styles[this.#style].imageSize;
		if (question.image) {
			let imageUrl = images.find((i) => i.id === question.image);
			if (imageUrl) {
				this.#doc.addImage(
					asset(`/img/${imageUrl.file}`),
					'PNG',
					this.#margin.left + this.#getMaxTextWidth() - imageSize.w - 5,
					this.#y,
					imageSize.w,
					imageSize.h,
					'',
					'FAST'
				);
			}
		}
		let choiceHeight = 0;
		for (let choice of question.choices) {
			this.#doc.setLineWidth(styles[this.#style].choiceBoxLineWidth);
			this.#doc.rect(
				this.#margin.left + padding,
				this.#y,
				this.#getFontSizeInMM(),
				this.#getFontSizeInMM()
			);
			if (choice.answer && this.#showSolution) {
				let spacing = styles[this.#style].choiceCrossSpacing;
				this.#doc.setLineWidth(styles[this.#style].choiceCrossLineWidth);
				this.#doc.line(
					this.#margin.left + padding + spacing,
					this.#y + spacing,
					this.#margin.left + padding + this.#getFontSizeInMM() - spacing,
					this.#y + this.#getFontSizeInMM() - spacing
				);
				this.#doc.line(
					this.#margin.left + padding + this.#getFontSizeInMM() - spacing,
					this.#y + spacing,
					this.#margin.left + padding + spacing,
					this.#y + this.#getFontSizeInMM() - spacing
				);
			}
			let maxWidth = this.#getMaxTextWidth() - padding - 10;
			if (question.image) {
				maxWidth -= imageSize.w + 10;
			}
			let splitText = this.#doc.splitTextToSize(choice.text, maxWidth);
			this.#doc.text(
				splitText,
				this.#margin.left + padding + this.#getFontSizeInMM() + 2,
				this.#y + this.#getFontSizeInMM()
			);
			let space =
				splitText.length * this.#getFontSizeInMM() * this.#doc.getLineHeightFactor() +
				spaceAfterChoice -
				(this.#getFontSizeInMM() * this.#doc.getLineHeightFactor()) / 2;
			this.#y += space;
			choiceHeight += space;
		}
		if (question.image && choiceHeight < imageSize.h) {
			this.#y += imageSize.h - choiceHeight;
		}
	}

	/**
	 * @param {string} text
	 */
	#addHeadline(text) {
		this.#setBold();
		this.#doc.setFontSize(styles[this.#style].headlineFontSize);
		let splitText = this.#splitText(text);
		this.#doc.text(splitText, this.#margin.left + this.#getMaxTextWidth() / 2, this.#margin.top, {
			align: 'center'
		});
		this.#y += splitText.length * this.#getFontSizeInMM() * this.#doc.getLineHeightFactor() + 5;
		this.#setNormal();
	}

	/**
	 * @param {string} text
	 */
	#addPreamble(text) {
		this.#doc.setFontSize(styles[this.#style].preambleFontSize);
		this.#setItalic();
		this.#putText(text);
		this.#setNormal();
	}

	#addHeader() {
		const pages = this.#doc.getNumberOfPages();
		this.#doc.setFontSize(styles[this.#style].headerFontSize);
		this.#setNormal();
		for (let i = 1; i <= pages; i++) {
			this.#doc.setPage(i);
			const text = `Fragebogen nach der hessischen Feuerwehrleistungsübung`;
			this.#doc.text(text, this.#doc.internal.pageSize.getWidth() / 2, this.#margin.top - 15, {
				align: 'center'
			});
			this.#doc.text(
				new Date().toLocaleDateString('de-DE', {
					year: 'numeric',
					month: '2-digit',
					day: '2-digit'
				}),
				this.#doc.internal.pageSize.getWidth() - this.#margin.right,
				this.#margin.top - 15,
				{ align: 'right' }
			);
		}
	}

	#addFooter() {
		const pages = this.#doc.getNumberOfPages();
		this.#doc.setFontSize(styles[this.#style].footerFontSize);
		this.#setNormal();
		for (let i = 1; i <= pages; i++) {
			this.#doc.setPage(i);
			const text = `Seite ${i} von ${pages}`;
			this.#doc.text(
				text,
				this.#doc.internal.pageSize.getWidth() / 2,
				this.#doc.internal.pageSize.getHeight() - this.#margin.bottom + 3,
				{ align: 'center' }
			);
		}
	}

	#addDetails() {
		this.#doc.setFontSize(styles[this.#style].questionFontSize);
		this.#setNormal();
		let text = 'Name:';
		let center = this.#margin.left + this.#getMaxTextWidth() / 2;
		let centerOffset = 2;
		let verticalLineOffset = 1;
		this.#doc.text(text, this.#margin.left, this.#y);
		this.#doc.line(
			this.#margin.left,
			this.#y + verticalLineOffset,
			center - centerOffset,
			this.#y + verticalLineOffset
		);
		text = 'Vorname:';
		this.#doc.text(text, center + centerOffset, this.#y);
		this.#doc.line(
			center + centerOffset,
			this.#y + verticalLineOffset,
			this.#margin.left + this.#getMaxTextWidth(),
			this.#y + verticalLineOffset
		);
		this.#y += 2 * (this.#getFontSizeInMM() * this.#doc.getLineHeightFactor()) + verticalLineOffset;
		text = 'Feuerwehr:';
		this.#doc.text(text, this.#margin.left, this.#y);
		this.#doc.line(
			this.#margin.left,
			this.#y + verticalLineOffset,
			this.#margin.left + this.#getMaxTextWidth(),
			this.#y + verticalLineOffset
		);
		this.#y += 2 * (this.#getFontSizeInMM() * this.#doc.getLineHeightFactor()) + verticalLineOffset;
		text = 'Landkreis / kreisfreie Stadt:';
		this.#doc.text(text, this.#margin.left, this.#y);
		this.#doc.line(
			this.#margin.left,
			this.#y + verticalLineOffset,
			this.#margin.left + this.#getMaxTextWidth(),
			this.#y + verticalLineOffset
		);
		this.#y += 2 * (this.#getFontSizeInMM() * this.#doc.getLineHeightFactor()) + verticalLineOffset;
		text = 'Funktion:';
		this.#doc.text(text, this.#margin.left, this.#y);
		this.#doc.line(
			this.#margin.left,
			this.#y + verticalLineOffset,
			this.#margin.left + this.#getMaxTextWidth(),
			this.#y + verticalLineOffset
		);
		this.#y += 2 * (this.#getFontSizeInMM() * this.#doc.getLineHeightFactor()) + verticalLineOffset;
		let start = this.#y;
		let padding = 5;
		this.#y += this.#getFontSizeInMM() * this.#doc.getLineHeightFactor() + padding;
		text = 'Korrekter Fragebogenkopf:';
		let offset = this.#margin.left + padding + this.#doc.getTextWidth(text) + 10;
		this.#doc.text(text, this.#margin.left + padding, this.#y);
		this.#doc.text('ja / nein', offset, this.#y);
		this.#y += 2 * this.#getFontSizeInMM() * this.#doc.getLineHeightFactor();
		this.#doc.text('Richtige Antworten:', this.#margin.left + padding, this.#y);
		this.#doc.line(offset, this.#y, offset + this.#getMaxTextWidth() / 4, this.#y);
		this.#y += padding * this.#doc.getLineHeightFactor();
		this.#doc.rect(this.#margin.left, start, this.#getMaxTextWidth(), this.#y - start);
		this.#y += this.#getFontSizeInMM() * this.#doc.getLineHeightFactor();
	}

	get() {
		return this.#doc;
	}
}
