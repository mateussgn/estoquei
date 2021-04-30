"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("cucumber");
const protractor_1 = require("protractor");
let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;
const request = require("request-promise");
var base_url = "http://localhost:3000/";
let sameCPF = (elem, cpf) => elem
    .element(protractor_1.by.name("cpflist"))
    .getText()
    .then((text) => text === cpf);
let sameName = (elem, name) => elem
    .element(protractor_1.by.name("nomelist"))
    .getText()
    .then((text) => text === name);
let pAND = (p, q) => p.then((a) => q.then((b) => a && b));
// async function criarAluno(name, cpf) {
//   await $("input[name='namebox']").sendKeys(<string>name);
//   await $("input[name='cpfbox']").sendKeys(<string>cpf);
//   await element(by.buttonText("Adicionar")).click();
// }
// async function assertTamanhoEqual(set, n) {
//   await set.then((elems) =>
//     expect(Promise.resolve(elems.length)).to.eventually.equal(n)
//   );
// }
// async function assertElementsWithSameCPFAndName(n, cpf, name) {
//   var allalunos: ElementArrayFinder = element.all(by.name("alunolist"));
//   var samecpfsandname = allalunos.filter((elem) =>
//     pAND(sameCPF(elem, cpf), sameName(elem, name))
//   );
//   await assertTamanhoEqual(samecpfsandname, n);
// }
// async function assertElementsWithSameCPF(n, cpf) {
//   var allalunos: ElementArrayFinder = element.all(by.name("alunolist"));
//   var samecpfs = allalunos.filter((elem) => sameCPF(elem, cpf));
//   await assertTamanhoEqual(samecpfs, n);
// }
function getScore(vendedor) {
    return __awaiter(this, void 0, void 0, function* () {
        return vendedor.monthly_sells != 0
            ? parseInt(vendedor.monthly_sales_price) / vendedor.monthly_sells
            : 0;
    });
}
function getSellerId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            method: `GET`,
            json: true,
            uri: `http://localhost:3000/sellers/${id}`,
        };
        try {
            const response = yield request(options);
            return response;
        }
        catch (error) {
            Promise.reject(error);
            expect(false).to.equal(true);
        }
    });
}
function checkSeller(id, name, monthly_sells, monthly_sales_price) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            method: `GET`,
            json: true,
            uri: `http://localhost:3000/sellers/${id}`,
        };
        try {
            const response = yield request(options);
            return Promise.resolve(response.monthly_sells.toString() == monthly_sells.toString() &&
                response.monthly_sales_price.toString() ==
                    monthly_sales_price.toString()
                ? expect(response.name.toString()).to.equal(name)
                : expect(false).to.equal(true));
        }
        catch (error) {
            Promise.reject(error);
            expect(false).to.equal(true);
        }
    });
}
function compareSeller(id, name, monthly_sells, monthly_sales_price, seller) {
    return __awaiter(this, void 0, void 0, function* () {
        return Promise.resolve(seller.monthly_sells.toString() == monthly_sells.toString() &&
            seller.monthly_sales_price.toString() == monthly_sales_price.toString()
            ? expect(seller.name.toString()).to.equal(name)
            : expect(false).to.equal(true));
    });
}
var seller;
cucumber_1.defineSupportCode(function ({ Given, When, Then }) {
    Given(/^eu estou na página "([^\"]*)"$/, (pagename) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/");
        yield expect(protractor_1.element(protractor_1.by.css("#pagename")).getText()).to.eventually.equal(pagename.toString());
        // await expect(browser.getTitle()).to.eventually.equal("TaGui");
        // await $("a[name='alunos']").click();
    }));
    Given(/^o vendedor está registrado com o id "(\d*)", nome "([^\"]*)", Número de vendas "(\d*)" e Valor bruto de vendas "([^\"]*)"$/, (id, name, monthly_sells, monthly_sales_price) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/");
        yield checkSeller(id.toString(), name.toString(), monthly_sells.toString(), monthly_sales_price.toString());
    }));
    When(/^eu vou para página "([^\"]*)"$/, (pagename) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get(`http://localhost:4200/${pagename.toString().toLowerCase()}/`);
        yield expect(protractor_1.element(protractor_1.by.css("#pagename")).getText()).to.eventually.equal(pagename.toString());
    }));
    When(/^eu pergunto ao sistema pelo vendedor com id "(\d*)"$/, (id) => __awaiter(this, void 0, void 0, function* () {
        seller = yield getSellerId(id.toString());
        // score = (await getScore(seller)).toString();
    }));
    // Then(/^o sistema retorna o vendedor que está registrado com o id "1", nome "Rafael Portugal", Número de vendas "1" e Valor bruto de vendas "32000.00""(\d*)"$/, async (localscore) => {
    //   await expect(score).to.equal(localscore.toString());
    // });
    Then(/^o sistema retorna o vendedor que está registrado com o id "(\d*)", nome "([^\"]*)", Número de vendas "(\d*)" e Valor bruto de vendas "([^\"]*)"$/, (id, name, monthly_sells, monthly_sales_price) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/");
        yield compareSeller(id.toString(), name.toString(), monthly_sells.toString(), monthly_sales_price.toString(), seller);
    }));
    Then(/^o sistema lista o vendedor com nome "([^\"]*)", o vendedor com nome "([^\"]*)" e o vendedor com nome "([^\"]*)", nesta ordem$/, (seller1, seller2, seller3) => __awaiter(this, void 0, void 0, function* () {
        let tmp_list = [seller1, seller2, seller3];
        yield protractor_1.element
            .all(protractor_1.by.css("#sellername"))
            .map(function (elm) {
            return elm.getText();
        })
            .then(function (texts) {
            let validate = true;
            texts.forEach((text, index) => {
                if (text != tmp_list[index]) {
                    validate = false;
                }
            });
            expect(validate).to.equal(true);
        });
        // res.forEach((seller, index) =>
        //   expect(seller[0].getText()).to.equal(tmp_list[index].toString())
        // )
        // await expect().to.eventually.equal(
        //   pagename.toString()
        // );
    }));
    //   Given(
    //     /^I cannot see a student with CPF "(\d*)" in the students list$/,
    //     async (cpf) => {
    //       await assertElementsWithSameCPF(0, cpf);
    //     }
    //   );
    //   When(
    //     /^I try to register the student "([^\"]*)" with CPF "(\d*)"$/,
    //     async (name, cpf) => {
    //       await criarAluno(name, cpf);
    //     }
    //   );
    //   Then(
    //     /^I can see "([^\"]*)" with CPF "(\d*)" in the students list$/,
    //     async (name, cpf) => {
    //       await assertElementsWithSameCPFAndName(1, cpf, name);
    //     }
    //   );
    //   Given(
    //     /^I can see a student with CPF "(\d*)" in the students list$/,
    //     async (cpf) => {
    //       await criarAluno("Clarissa", cpf);
    //       await assertElementsWithSameCPF(1, cpf);
    //     }
    //   );
    //   Then(
    //     /^I cannot see "([^\"]*)" with CPF "(\d*)" in the students list$/,
    //     async (name, cpf) => {
    //       await assertElementsWithSameCPFAndName(0, cpf, name);
    //     }
    //   );
    //   Then(/^I can see an error message$/, async () => {
    //     var allmsgs: ElementArrayFinder = element.all(by.name("msgcpfexistente"));
    //     await assertTamanhoEqual(allmsgs, 1);
    //   });
    //   Given(/^the system has no student with CPF "(\d*)"$/, async (cpf) => {
    //     await request
    //       .get(base_url + "alunos")
    //       .then((body) => expect(body.includes(`"cpf":"${cpf}"`)).to.equal(false));
    //   });
    //   When(
    //     /^I register the student "([^\"]*)" with CPF "(\d*)"$/,
    //     async (name, cpf) => {
    //       let aluno = { nome: name, cpf: cpf, email: "" };
    //       var options: any = {
    //         method: "POST",
    //         uri: base_url + "aluno",
    //         body: aluno,
    //         json: true,
    //       };
    //       await request(options).then((body) =>
    //         expect(JSON.stringify(body)).to.equal(
    //           '{"success":"O aluno foi cadastrado com sucesso"}'
    //         )
    //       );
    //     }
    //   );
    //   Then(
    //     /^the system now stores "([^\"]*)" with CPF "(\d*)"$/,
    //     async (name, cpf) => {
    //       let resposta = `{"nome":"${name}","cpf":"${cpf}","email":"","metas":{}`;
    //       await request
    //         .get(base_url + "alunos")
    //         .then((body) => expect(body.includes(resposta)).to.equal(true));
    //     }
    //   );
});
