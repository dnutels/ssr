import React from 'react';

import {describe, it} from 'mocha';
import chai from 'chai';
import enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
enzyme.configure({ adapter: new Adapter() });
import chaiEnzyme from 'chai-enzyme';

chai.use(chaiEnzyme());

const {expect} = chai;

import Font from '../../../../lib/elements/page/Font';

describe('<Font> component', function() {
    it('should allow empty content', function() {
        const script = shallow(<Font />);

        // expect(script).to.be.present();
        expect(script).to.be.blank();
        expect(script).to.have.html('<style></style>');
    });

    it('should allow empty `fonts` property', function() {
        const script = shallow(<Font fonts={[]} />);

        expect(script).to.be.present();
        expect(script).to.be.blank();
        expect(script).to.have.html('<style></style>');
    });

    it('should not allow partial `fonts` structure', function() {
        const fonts = [
            {name: 'Monserrat'}
        ];

        const script = shallow(<Font fonts={fonts} />);

        expect(script).to.be.present();
        expect(script).to.not.have.html(`<style>@font-face {
            font-family: "Monserrat";
        }</style>`);
    });
});
