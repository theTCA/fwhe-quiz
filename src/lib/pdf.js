import jsPDF from "jspdf";

export class QuizBuilder {
    #doc
    #margin = {top: 30, left: 20, right: 35, bottom: 15}
    #y = 25
    /** @type {('normal' | 'xl')} */
    #style = "normal"
    #questions
    #showSolution
    /**
     * @param {{question: string;choices: {answer: boolean;text: string;}[];}[]} questions
     * @param {{style?: 'normal' | 'xl';showSolution?: boolean;}} options
     * @param {string} name
     */
    constructor(name, questions, options={style: "normal", showSolution: false}) {
        this.#doc = new jsPDF({
            orientation: "portrait",
            unit: "mm",
            format: "a4"
        });
        this.#style = options.style ? options.style : "normal";
        this.#showSolution = options.showSolution ? options.showSolution : false;
        this.#questions = questions;
        if(this.#showSolution) {
            this.#addHeadline(`${name} - Lösungen`);
        } else {
            this.#addHeadline(name);
            this.#addPreamble("Es ist immer nur eine Antwortmöglichkeit richtig!");
        }
        for(const [index, question] of questions.entries())
            this.#addQuestion(index+1, question);
        this.#addHeader();
        this.#addFooter();
    }

    #getFontSizeInMM() {
        return this.#doc.getFontSize() * 0.352777;
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
        this.#y += ((splitText.length - 1) * this.#getFontSizeInMM()) * this.#doc.getLineHeightFactor();
    }

    /**
     * @param {string} text
     */
    #splitText(text) {
        return this.#doc.splitTextToSize(text, this.#getMaxTextWidth());
    }

    #setBold() {
        this.#doc.setFont(this.#doc.getFont().fontName, "bold");
    }

    #setNormal() {
        this.#doc.setFont(this.#doc.getFont().fontName, "normal");
    }


    #setItalic() {
        this.#doc.setFont(this.#doc.getFont().fontName, "italic");
    }

    /**
     * @param {number} number
     * @param {{question: string;choices: {answer: boolean;text: string;}[];}} question
     */
    #addQuestion(number, question) {
        const spaceAfterQuestion = 7;
        const spaceAfterQuestionText = 3;
        switch(this.#style) {
            case "normal":
                this.#doc.setFontSize(10);
                break;
            case "xl":
                this.#doc.setFontSize(14);
                break;
        }
        const spaceAfterChoice = this.#getFontSizeInMM();
        const lines = this.#splitText(question.question + "\n" + question.choices.reduce((acc, c) => acc + c.text + "\n", "").trim()).length;
        const lineHeight = lines * this.#getFontSizeInMM() * this.#doc.getLineHeightFactor();
        if(this.#y + (spaceAfterQuestion + spaceAfterQuestionText + (spaceAfterChoice * question.choices.length) + (lineHeight)) > this.#doc.internal.pageSize.getHeight())
            this.#addPage();
        else
            this.#y += spaceAfterQuestion;
        this.#setBold();
        const numberText = `${number}. `;
        this.#putText(numberText);
        const offset = this.#doc.getTextWidth(`${this.#questions.length}. `);
        this.#putText(question.question, this.#margin.left + offset);
        this.#setNormal();
        this.#y += spaceAfterQuestionText;
        for(let choice of question.choices) {
            switch(this.#style) {
                case "normal":
                    this.#doc.setLineWidth(0.1);
                    break;
                case "xl":
                    this.#doc.setLineWidth(0.3);
                    break;
            }
            this.#doc.rect(this.#margin.left + offset, this.#y, this.#getFontSizeInMM(), this.#getFontSizeInMM());
            if(choice.answer && this.#showSolution) {
                let spacing = 0;
                switch(this.#style) {
                    case "normal":
                        spacing = 1;
                        this.#doc.setLineWidth(0.4);
                        break;
                    case "xl":
                        spacing = 1.3;
                        this.#doc.setLineWidth(0.6);
                        break;
                }
                this.#doc.line(this.#margin.left + offset + spacing, this.#y + spacing, this.#margin.left + offset + this.#getFontSizeInMM() - spacing, this.#y + this.#getFontSizeInMM() - spacing);
                this.#doc.line(this.#margin.left + offset + this.#getFontSizeInMM() - spacing, this.#y + spacing, this.#margin.left + offset + spacing, this.#y + this.#getFontSizeInMM() - spacing);
            }
            this.#putText(choice.text, this.#margin.left + offset + this.#getFontSizeInMM() + 2, this.#y + this.#getFontSizeInMM());
            this.#y += spaceAfterChoice + this.#getFontSizeInMM() * this.#doc.getLineHeightFactor() / 2;
        }
    }

    /**
     * @param {string} text
     */
    #addHeadline(text) {
        this.#setBold();
        switch(this.#style) {
            case "normal":
                this.#doc.setFontSize(14);
                break;
            case "xl":
                this.#doc.setFontSize(20);
                break;
        }
        let splitText = this.#splitText(text);
        this.#doc.text(splitText, this.#doc.internal.pageSize.getWidth() / 2, this.#margin.top, {align: "center"});
        this.#setNormal();
        this.#y += this.#doc.getTextDimensions(splitText).h * this.#doc.getLineHeightFactor() + 5;
    }

    /**
     * @param {string} text
     */
    #addPreamble(text) {
        switch(this.#style) {
            case "normal":
                this.#doc.setFontSize(8);
                break;
            case "xl":
                this.#doc.setFontSize(10);
                break;
        }
        this.#setItalic();
        this.#putText(text);
        this.#setNormal();
        this.#y += this.#doc.getTextDimensions(text).h * this.#doc.getLineHeightFactor();
    }

    #addHeader() {
        const pages = this.#doc.getNumberOfPages();
        switch(this.#style) {
            case "normal":
                this.#doc.setFontSize(7);
                break;
            case "xl":
                this.#doc.setFontSize(10);
                break;
        }
        this.#setNormal();
        for(let i = 1; i <= pages; i++) {
            this.#doc.setPage(i);
            const text = `Fragebogen nach der hessischen Feuerwehrleistungsübung`;
            this.#doc.text(text, this.#doc.internal.pageSize.getWidth() / 2, this.#margin.top - 15, {align: "center"});
            this.#doc.text(new Date().toLocaleDateString("de-DE", {year: "numeric", month: "2-digit", day:"2-digit"}), this.#doc.internal.pageSize.getWidth() - this.#margin.right, this.#margin.top - 15, {align: "left"});
        }
    }

    #addFooter() {
        const pages = this.#doc.getNumberOfPages();
        switch(this.#style) {
            case "normal":
                this.#doc.setFontSize(7);
                break;
            case "xl":
                this.#doc.setFontSize(10);
                break;
        }
        this.#setNormal();
        for(let i = 1; i <= pages; i++) {
            this.#doc.setPage(i);
            const text = `Seite ${i} von ${pages}`;
            this.#doc.text(text, this.#doc.internal.pageSize.getWidth() / 2, this.#doc.internal.pageSize.getHeight() - this.#margin.bottom + 3, {align: "center"});
        }
    }

    get() {
        return this.#doc;
    }
}