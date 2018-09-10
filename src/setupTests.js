import { configure, shallow, mount, render } from 'enzyme'
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';


configure({ adapter: new Adapter() });

global.sinon = sinon


global.shallow = shallow 
global.mount = mount 
global.render = render