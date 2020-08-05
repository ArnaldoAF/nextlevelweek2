import React from 'react';

import './styles.css';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

const TeacherItem: React.FC = () => {
    return (
                <article className="teacher-item">
                    <header>
                        <img src="https://avatars1.githubusercontent.com/u/27612157?s=460&u=6a4ef1c8f75d059e18ec2d4c10b6bc0978efaf2a&v=4" alt="foto Arnaldo"/>
                        <div>
                            <strong>
                                Arnaldo Assis Ferreira
                            </strong>
                            <span>Programação</span>
                        </div>
                    </header>

                    <p>
                        Lorem ipsum dolor sit amet, 
                        <br />
                        consectetur adipiscing elit. Donec pellentesque ut lectus eget cursus. In posuere nisi sem, a pulvinar odio tristique eu. Sed commodo sagittis felis et hendrerit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc non fermentum mauris. Nulla a arcu id nunc vestibulum semper et vel enim. Aenean pharetra erat at dui fringilla, sed laoreet nisl pulvinar. Nulla hendrerit elit felis, eget tincidunt ipsum rutrum in. Aliquam et velit nulla. Etiam odio odio, tincidunt nec faucibus blandit, eleifend sollicitudin justo.
                    </p>

                    <footer>
                        <p>
                            Preço/hora 
                            <strong>R$ 80,00</strong>
                        </p>
                        <button type="button">
                            <img src={whatsappIcon} alt="Whatsapp"/>
                            Entrar em contato
                        </button>
                    </footer>
                </article>
    );
}

export default TeacherItem;