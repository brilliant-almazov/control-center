import * as DomainTypes from '../damsel/gen-nodejs/domain_types';

export const toGenDomainObject = (genObject: any, field: string) => {
    const domainObjectGen = new DomainTypes.DomainObject();
    domainObjectGen[field] = genObject;
    return domainObjectGen;
};
