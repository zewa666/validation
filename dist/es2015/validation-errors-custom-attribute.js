var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { bindingMode } from 'aurelia-binding';
import { Lazy } from 'aurelia-dependency-injection';
import { customAttribute } from 'aurelia-templating';
import { ValidationController } from './validation-controller';
export let ValidationErrorsCustomAttribute = class ValidationErrorsCustomAttribute {
    constructor(boundaryElement, controllerAccessor) {
        this.boundaryElement = boundaryElement;
        this.controllerAccessor = controllerAccessor;
        this.errors = [];
    }
    sort() {
        this.errors.sort((a, b) => {
            if (a.targets[0] === b.targets[0]) {
                return 0;
            }
            return a.targets[0].compareDocumentPosition(b.targets[0]) & 2 ? 1 : -1;
        });
    }
    interestingElements(elements) {
        return elements.filter(e => this.boundaryElement.contains(e));
    }
    render(instruction) {
        for (let { error } of instruction.unrender) {
            const index = this.errors.findIndex(x => x.error === error);
            if (index !== -1) {
                this.errors.splice(index, 1);
            }
        }
        for (let { error, elements } of instruction.render) {
            const targets = this.interestingElements(elements);
            if (targets.length) {
                this.errors.push({ error: error, targets });
            }
        }
        this.sort();
        this.value = this.errors;
    }
    bind() {
        this.controllerAccessor().addRenderer(this);
        this.value = this.errors;
    }
    unbind() {
        this.controllerAccessor().removeRenderer(this);
    }
};
ValidationErrorsCustomAttribute.inject = [Element, Lazy.of(ValidationController)];
ValidationErrorsCustomAttribute = __decorate([
    customAttribute('validation-errors', bindingMode.twoWay)
], ValidationErrorsCustomAttribute);
