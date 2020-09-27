import React, {useEffect, useState} from 'react';
import './MailBoxComponent.css';
import inbox from './json/inbox.json';
import spam from './json/spam.json';
import deleted from './json/deleted.json';
import custom from './json/custom.json';
import { Search, Trash, Flag, FlagFill} from 'react-bootstrap-icons';

const MailBoxComponent = () => {
const CATEGORIES=[{
    id:'inbox',
    name:'Inbox',
    count: 0
},
{
    id:'spam',
    name:'Spam',
    count: 0
}, 
{
    id:'deleted',
    name:'Deleted Items',
    count: 0
}, 
{
    id:'custom',
    name:'Custom Folder',
    count: 0
}];

const [state, setState] = useState(
    {
    inbox: [],
    spam:[],
    deleted: [],
    custom:[]
});

const[categories, setCategory] = useState(CATEGORIES);

const [active, setActive] = useState('inbox');
const [mail, setMail] = useState({
    from: '',
    subject: '',
    content: ''
});

useEffect(() => {
    setState({
        inbox,
        spam,
        deleted,
        custom
    });
    debugger;
    if (localStorage.getItem("active") === null) {
        localStorage.setItem("active", active);
    } else {
        setActive(localStorage.getItem("active"));
    }
    debugger;
    if (localStorage.getItem("state") !== null) {
        debugger;
        let stateObj = localStorage.getItem('state');
        setState(JSON.parse(stateObj));
    }
    return () => localStorage.removeItem("active");
}, []);

const updateCounts = () => {
    let result = CATEGORIES.map(category => {
        let folder = state[category.id];
        let counter = 0;
        folder.forEach(item => {
            if(item.unread) {
                counter++;
            }
        })
        console.log(counter);
        let count = `(${counter})`;
        let obj = {...category, count:counter};
        return obj;
    });
    console.log(result);
    setCategory(result);
}

useEffect(() => {
    debugger;
    localStorage.setItem('state', JSON.stringify(state));
    updateCounts();
 }, [state]);

const deleteEmail = (item, event) => {
    debugger;
    let result = state[active].filter(mail => item.mId !== mail.mId);
    let deleted = [...state['deleted']];
    deleted.unshift(item);
    setState({
        ...state,
        [active]: result,
        deleted
    });
    
    event.stopPropagation();
}

const handleClick = (category) => {
    setActive(category.id);
    setMail({});
    localStorage.setItem("active", category.id);
}

const setEmail = (item) => {
    item.unread = false;
    setMail(item);
    updateCounts();
}

const changeFlag = (item, event) => {
    debugger;
    item.flag = !item.flag;
    setMail(item);
   // event.stopPropagation();
}

  return (
      
      <div className="container">
        <div className="row">
            <div className="col-lg-2 filter-section">
                <div className="search">Search Mail and People <Search /></div>
                <div>
                <div className="heading">^ Folders</div>
                {categories.map(category => {
                    return (
                    <div
                        key={category.id}
                        className={"category " + (active === category.id ? 'active' : '')}
                        onClick={()=> handleClick(category)}>
                            {category.name}({category.count})
                    </div>
                    );
                })

                }
                </div>
            </div>
            <div className="col-lg-3 overview-section">
                <div className="overview-heading">
                    <span className="plus">+ </span>
                    <span>New</span>
                    <span className="mark">Mark all as Read</span>
                </div>
                <div className="heading"></div>
                <div className="mail-container">
                    {state[active].length === 0 ? 'No mails' : null}
                    {state[active].length > 0 && state[active].map((item) => {
                        return (
                            <div key={item.mId} className="email-item" onClick={() => setEmail(item)}>
                                <div className="from">{item.from}
                                    <span onClick={(event)=> changeFlag(item, event)}>
                                        {
                                            !item.flag ? <Flag /> : <FlagFill />
                                        }
                                    </span>
                                    <span onClick={(event) => deleteEmail(item, event)}>
                                        <Trash />
                                    </span>
                                </div>
                                <div className="subject">{item.subject}
                                    <span>{item.time}</span>
                                </div>
                                <div className="content">
                                    
                                        {item.content}
                                    
                                </div>
                            </div>
                        );
                    })

                    }
                </div>
            </div>
            <div className="col-lg-7 detail-section">
                <div className="from">
                    {mail.from}
                </div>
                <div className="subject">
                    {mail.subject}
                </div>
                <div className="mail-content">
                        {mail.content}
                </div>
            </div>
        </div>
    </div>
  );
}

export default MailBoxComponent;