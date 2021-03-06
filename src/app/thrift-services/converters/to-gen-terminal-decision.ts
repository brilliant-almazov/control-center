import * as DomainTypes from '../damsel/gen-nodejs/domain_types';
import {
    Condition,
    PartyCondition,
    PartyConditionDefinition,
    Predicate,
    TerminalDecision,
    TerminalRef,
    TerminalSelector
} from '../damsel/gen-model/domain';

const toPartyConditionDefinitionGen = (definition: PartyConditionDefinition) => {
    const definitionGen = new DomainTypes.PartyConditionDefinition();
    definitionGen.shop_is = definition.shop_is;
    return definitionGen;
};

const toPartyConditionGen = (partyCondition: PartyCondition) => {
    const partyConditionGen = new DomainTypes.PartyCondition();
    partyConditionGen.id = partyCondition.id;
    partyConditionGen.definition = toPartyConditionDefinitionGen(partyCondition.definition);
    return partyConditionGen;
};

const toConditionGen = (condition: Condition) => {
    const conditionDef = new DomainTypes.Condition();
    if (condition.party) {
        conditionDef.party = toPartyConditionGen(condition.party);
    }
    return conditionDef;
};

const toPredicateGen = (predicate: Predicate) => {
    const predicateGen = new DomainTypes.Predicate();
    if (predicate.condition) {
        predicateGen.condition = toConditionGen(predicate.condition);
    }
    return predicateGen;
};

const toTerminalRefGen = (ref: TerminalRef) => {
    const terminalRefGen = new DomainTypes.TerminalRef();
    terminalRefGen.id = ref.id;
    return terminalRefGen;
};

const toTerminalSelectorGen = (selector: TerminalSelector) => {
    const selectorGen = new DomainTypes.TerminalSelector();
    if (selector.value) {
        selectorGen.value = Array.from(selector.value).map(ref => toTerminalRefGen(ref));
    }
    return selectorGen;
};

export const toGenTerminalDecision = (terminalDecision: TerminalDecision) => {
    const terminalDecisionGen = new DomainTypes.TerminalDecision();
    terminalDecisionGen.if_ = toPredicateGen(terminalDecision.if_);
    terminalDecisionGen.then_ = toTerminalSelectorGen(terminalDecision.then_);
    return terminalDecisionGen;
};
