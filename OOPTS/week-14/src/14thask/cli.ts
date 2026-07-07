import inquirer from 'inquirer';
import chalk from 'chalk';
import { ContactManager } from './3 ContactManager.ts';
import type { Contact, CreateContact, UpdateContact } from '../12thask/types.ts';

class ContactCLI {
  private manager: ContactManager;

  constructor() {
    this.manager = new ContactManager();
  }

  private formatPhone(phone: string): string {
    return chalk.cyan(phone);
  }

  private formatName(contact: Contact): string {
    return chalk.white.bold(`${contact.firstName} ${contact.lastName}`);
  }

  private async showWelcomeScreen(): Promise<void> {
    console.clear();
    console.log(chalk.blue.bold('\n╔══════════════════════════════════════════╗'));
    console.log(chalk.blue.bold('║     📞  КОНТАКТ-МЕНЕДЖЕР v1.0  📞        ║'));
    console.log(chalk.blue.bold('╚══════════════════════════════════════════╝\n'));
  }

  private async pressAnyKey(): Promise<void> {
    await inquirer.prompt([
      {
        type: 'input',
        name: 'continue',
        message: chalk.gray('Нажмите Enter для продолжения...')
      }
    ]);
  }

  private async addContact(): Promise<void> {
    console.clear();
    console.log(chalk.green.bold('\n➕ ДОБАВЛЕНИЕ НОВОГО КОНТАКТА\n'));

    const answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: 'Имя:',
        validate: (input) => input ? true : 'Имя обязательно'
      },
      {
        type: 'input',
        name: 'lastName',
        message: 'Фамилия:',
        validate: (input) => input ? true : 'Фамилия обязательна'
      },
      {
        type: 'input',
        name: 'phone',
        message: 'Телефон:',
        validate: (input) => {
          const phoneRegex = /^[\d+\-\s()]+$/;
          return input && phoneRegex.test(input) ? true : 'Введите корректный номер телефона';
        }
      },
      {
        type: 'input',
        name: 'email',
        message: 'Email:',
        validate: (input) => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return input && emailRegex.test(input) ? true : 'Введите корректный email';
        }
      },
      {
        type: 'input',
        name: 'birthDate',
        message: 'Дата рождения (ДД.ММ.ГГГГ, необязательно):',
      },
      {
        type: 'input',
        name: 'address',
        message: 'Адрес (необязательно):',
      },
      {
        type: 'input',
        name: 'tags',
        message: 'Теги (через запятую, необязательно):',
      }
    ]);

    const contactData: CreateContact = {
      firstName: answers.firstName,
      lastName: answers.lastName,
      phone: answers.phone,
      email: answers.email,
      tags: answers.tags ? answers.tags.split(',').map((t: string) => t.trim()) : []
    };

    if (answers.birthDate) {
      const [day, month, year] = answers.birthDate.split('.');
      contactData.birthDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
    }

    if (answers.address) {
      contactData.address = answers.address;
    }

    const result = this.manager.addContact(contactData);

    if (result.success) {
      console.log(chalk.green(`\n✅ Контакт успешно добавлен!`));
      console.log(chalk.gray(`   ID: ${result.contact?.id}`));
    } else {
      console.log(chalk.red(`\n❌ Ошибка: ${result.error}`));
    }

    await this.pressAnyKey();
  }

  private async viewContacts(contacts?: Contact[]): Promise<void> {
    const contactsToShow = contacts || this.manager.getAllContacts();
    
    console.clear();
    console.log(chalk.cyan.bold('\n📋 СПИСОК КОНТАКТОВ\n'));

    if (contactsToShow.length === 0) {
      console.log(chalk.yellow('Нет контактов для отображения.'));
      await this.pressAnyKey();
      return;
    }

    const stats = this.manager.getStatistics();
    console.log(chalk.gray(`Всего контактов: ${stats.total} | Избранных: ${stats.favorites}\n`));

    for (const contact of contactsToShow) {
      const favoriteIcon = contact.isFavorite ? '⭐' : '  ';
      console.log(chalk.white.bold(`\n${favoriteIcon} ${this.formatName(contact)}`));
      console.log(chalk.gray(`   📞 ${this.formatPhone(contact.phone)}`));
      console.log(chalk.gray(`   ✉️  ${contact.email}`));
      if (contact.birthDate) {
        console.log(chalk.gray(`   🎂 ${contact.birthDate.toLocaleDateString('ru-RU')}`));
      }
      if (contact.address) {
        console.log(chalk.gray(`   🏠 ${contact.address}`));
      }
      if (contact.tags.length > 0) {
        const tags = contact.tags.map(t => chalk.blue(`#${t}`)).join(' ');
        console.log(chalk.gray(`   🏷️  ${tags}`));
      }
      console.log(chalk.gray(`   🆔 ${contact.id.slice(-8)}`));
    }

    await this.pressAnyKey();
  }

  private async searchContacts(): Promise<void> {
    console.clear();
    console.log(chalk.yellow.bold('\n🔍 ПОИСК КОНТАКТОВ\n'));

    const { searchType } = await inquirer.prompt([
      {
        type: 'list',
        name: 'searchType',
        message: 'Выберите тип поиска:',
        choices: [
          { name: 'Поиск по ключевому слову', value: 'keyword' },
          { name: 'Поиск по имени', value: 'firstName' },
          { name: 'Поиск по фамилии', value: 'lastName' },
          { name: 'Поиск по телефону', value: 'phone' },
          { name: 'Поиск по email', value: 'email' },
          { name: 'Поиск по тегам', value: 'tags' },
          { name: 'Только избранные', value: 'favorites' }
        ]
      }
    ]);

    let filter: any = {};

    switch (searchType) {
      case 'keyword':
        const { keyword } = await inquirer.prompt([
          { type: 'input', name: 'keyword', message: 'Введите поисковый запрос:' }
        ]);
        filter.searchTerm = keyword;
        break;
      case 'firstName':
        const { firstName } = await inquirer.prompt([
          { type: 'input', name: 'firstName', message: 'Введите имя:' }
        ]);
        filter.firstName = firstName;
        break;
      case 'lastName':
        const { lastName } = await inquirer.prompt([
          { type: 'input', name: 'lastName', message: 'Введите фамилию:' }
        ]);
        filter.lastName = lastName;
        break;
      case 'phone':
        const { phone } = await inquirer.prompt([
          { type: 'input', name: 'phone', message: 'Введите номер телефона:' }
        ]);
        filter.phone = phone;
        break;
      case 'email':
        const { email } = await inquirer.prompt([
          { type: 'input', name: 'email', message: 'Введите email:' }
        ]);
        filter.email = email;
        break;
      case 'tags':
        const { tags } = await inquirer.prompt([
          { type: 'input', name: 'tags', message: 'Введите теги через запятую:' }
        ]);
        filter.tags = tags.split(',').map((t: string) => t.trim());
        break;
      case 'favorites':
        filter.isFavorite = true;
        break;
    }

    const results = this.manager.searchContacts(filter);
    
    if (results.length === 0) {
      console.log(chalk.yellow('\n❌ Контакты не найдены'));
    } else {
      console.log(chalk.green(`\n✅ Найдено контактов: ${results.length}\n`));
      await this.viewContacts(results);
      return;
    }

    await this.pressAnyKey();
  }

  private async editContact(): Promise<void> {
    const contacts = this.manager.getAllContacts();
    
    if (contacts.length === 0) {
      console.log(chalk.yellow('Нет контактов для редактирования.'));
      await this.pressAnyKey();
      return;
    }

    const { contactId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'contactId',
        message: 'Выберите контакт для редактирования:',
        choices: contacts.map(c => ({
          name: `${c.firstName} ${c.lastName} - ${c.phone}`,
          value: c.id
        }))
      }
    ]);

    const contact = this.manager.getContactById(contactId);
    if (!contact) return;

    console.clear();
    console.log(chalk.yellow.bold(`\n✏️  РЕДАКТИРОВАНИЕ КОНТАКТА: ${contact.firstName} ${contact.lastName}\n`));

    const updates = await inquirer.prompt([
      {
        type: 'input',
        name: 'firstName',
        message: `Имя (${contact.firstName}):`,
      },
      {
        type: 'input',
        name: 'lastName',
        message: `Фамилия (${contact.lastName}):`,
      },
      {
        type: 'input',
        name: 'phone',
        message: `Телефон (${contact.phone}):`,
      },
      {
        type: 'input',
        name: 'email',
        message: `Email (${contact.email}):`,
      },
      {
        type: 'confirm',
        name: 'isFavorite',
        message: `В избранном? (сейчас ${contact.isFavorite ? 'да' : 'нет'}):`,
        default: contact.isFavorite
      }
    ]);

    const updateData: UpdateContact = {};
    if (updates.firstName) updateData.firstName = updates.firstName;
    if (updates.lastName) updateData.lastName = updates.lastName;
    if (updates.phone) updateData.phone = updates.phone;
    if (updates.email) updateData.email = updates.email;
    if (updates.isFavorite !== contact.isFavorite) updateData.isFavorite = updates.isFavorite;

    if (Object.keys(updateData).length === 0) {
      console.log(chalk.yellow('Нет изменений для сохранения.'));
      await this.pressAnyKey();
      return;
    }

    const result = this.manager.updateContact(contactId, updateData);
    
    if (result.success) {
      console.log(chalk.green('✅ Контакт успешно обновлен!'));
    } else {
      console.log(chalk.red(`❌ Ошибка: ${result.error}`));
    }

    await this.pressAnyKey();
  }

  private async deleteContact(): Promise<void> {
    const contacts = this.manager.getAllContacts();
    
    if (contacts.length === 0) {
      console.log(chalk.yellow('Нет контактов для удаления.'));
      await this.pressAnyKey();
      return;
    }

    const { contactId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'contactId',
        message: 'Выберите контакт для удаления:',
        choices: contacts.map(c => ({
          name: `${c.firstName} ${c.lastName} - ${c.phone}`,
          value: c.id
        }))
      }
    ]);

    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: 'Вы уверены, что хотите удалить этот контакт?',
        default: false
      }
    ]);

    if (confirm) {
      const success = this.manager.deleteContact(contactId);
      if (success) {
        console.log(chalk.green('✅ Контакт успешно удален!'));
      } else {
        console.log(chalk.red('❌ Ошибка при удалении контакта'));
      }
    }

    await this.pressAnyKey();
  }

  private async toggleFavorite(): Promise<void> {
    const contacts = this.manager.getAllContacts();
    
    if (contacts.length === 0) {
      console.log(chalk.yellow('Нет контактов.'));
      await this.pressAnyKey();
      return;
    }

    const { contactId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'contactId',
        message: 'Выберите контакт:',
        choices: contacts.map(c => ({
          name: `${c.isFavorite ? '⭐' : '  '} ${c.firstName} ${c.lastName} - ${c.phone}`,
          value: c.id
        }))
      }
    ]);

    const result = this.manager.toggleFavorite(contactId);
    
    if (result.success) {
      const status = result.isFavorite ? 'добавлен в' : 'удален из';
      console.log(chalk.green(`✅ Контакт ${status} избранное!`));
    } else {
      console.log(chalk.red(`❌ Ошибка: ${result.error}`));
    }

    await this.pressAnyKey();
  }

  private async showStatistics(): Promise<void> {
    console.clear();
    console.log(chalk.magenta.bold('\n📊 СТАТИСТИКА КОНТАКТОВ\n'));

    const stats = this.manager.getStatistics();
    
    console.log(chalk.white.bold('┌─────────────────────────────────────────┐'));
    console.log(chalk.white.bold('│         ОБЩАЯ СТАТИСТИКА                │'));
    console.log(chalk.white.bold('├─────────────────────────────────────────┤'));
    console.log(`│ ${chalk.white('Всего контактов:')}     ${String(stats.total).padStart(13)}           │`);
    console.log(`│ ${chalk.yellow('В избранном:')}         ${String(stats.favorites).padStart(13)}           │`);
    console.log(`│ ${chalk.green('С email:')}             ${String(stats.withEmail).padStart(13)}           │`);
    console.log(`│ ${chalk.blue('С телефоном:')}          ${String(stats.withPhone).padStart(13)}           │`);
    console.log(`│ ${chalk.cyan('С адресом:')}            ${String(stats.withAddress).padStart(13)}           │`);
    console.log(chalk.white.bold('└─────────────────────────────────────────┘\n'));

    if (stats.uniqueTags.length > 0) {
      console.log(chalk.white.bold('🏷️  ПОПУЛЯРНЫЕ ТЕГИ:\n'));
      stats.uniqueTags.forEach(tag => {
        console.log(`   ${chalk.blue(`#${tag}`)}`);
      });
      console.log('');
    }

    await this.pressAnyKey();
  }

  private async showMainMenu(): Promise<void> {
    while (true) {
      await this.showWelcomeScreen();

      const { action } = await inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: 'Выберите действие:',
          pageSize: 15,
          choices: [
            { name: '➕  Добавить контакт', value: 'add' },
            { name: '📋  Показать все контакты', value: 'list' },
            { name: '🔍  Поиск контактов', value: 'search' },
            { name: '✏️   Редактировать контакт', value: 'edit' },
            { name: '🗑   Удалить контакт', value: 'delete' },
            { name: '⭐  Добавить/удалить из избранного', value: 'favorite' },
            { name: '⭐  Показать избранные контакты', value: 'showFavorites' },
            { name: '📊  Статистика', value: 'stats' },
            { name: '🚪  Выход', value: 'exit' }
          ]
        }
      ]);

      switch (action) {
        case 'add':
          await this.addContact();
          break;
        case 'list':
          await this.viewContacts();
          break;
        case 'search':
          await this.searchContacts();
          break;
        case 'edit':
          await this.editContact();
          break;
        case 'delete':
          await this.deleteContact();
          break;
        case 'favorite':
          await this.toggleFavorite();
          break;
        case 'showFavorites':
          const favorites = this.manager.getFavoriteContacts();
          await this.viewContacts(favorites);
          break;
        case 'stats':
          await this.showStatistics();
          break;
        case 'exit':
          console.log(chalk.yellow('\n👋 До свидания! Хорошего дня!\n'));
          process.exit(0);
      }
    }
  }

  async start(): Promise<void> {
    await this.showMainMenu();
  }
}

// Запуск приложения
const cli = new ContactCLI();
cli.start().catch(console.error);