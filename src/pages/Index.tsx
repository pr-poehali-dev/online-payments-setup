import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import Icon from '@/components/ui/icon';

const Index = () => {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { toast } = useToast();
  
  // Состояние для форм
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    birthDate: '',
    fsrId: '',
    institution: '',
    coach: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Обработчики форм
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      toast({
        title: "Ошибка",
        description: "Заполните все поля",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Вход выполнен",
      description: "Добро пожаловать в личный кабинет!"
    });
    setIsRegisterOpen(false);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Валидация
    const required = ['fullName', 'birthDate', 'fsrId', 'institution', 'coach', 'email', 'phone', 'password', 'confirmPassword'];
    const missing = required.filter(field => !registerForm[field as keyof typeof registerForm]);
    
    if (missing.length > 0) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }
    
    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: "Ошибка",
        description: "Пароли не совпадают",
        variant: "destructive"
      });
      return;
    }
    
    if (registerForm.password.length < 6) {
      toast({
        title: "Ошибка",
        description: "Пароль должен содержать минимум 6 символов",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Регистрация успешна!",
      description: "На вашу почту отправлено письмо для подтверждения"
    });
    setIsRegisterOpen(false);
    setRegisterForm({
      fullName: '',
      birthDate: '',
      fsrId: '',
      institution: '',
      coach: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    });
  };

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) {
      toast({
        title: "Ошибка",
        description: "Заполните обязательные поля",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Сообщение отправлено",
      description: "Мы свяжемся с вами в ближайшее время"
    });
    setContactForm({ name: '', phone: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <img 
                src="https://cdn.poehali.dev/files/d1a53069-af27-40b6-a5a1-752f7f868665.png" 
                alt="Мир шахмат" 
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-lg font-semibold text-primary">Мир шахмат</h1>
                <p className="text-sm text-muted-foreground">Центр поддержки детского 
шахматного спорта</p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection('home')} className="text-foreground hover:text-primary transition-colors">Главная</button>
              <button onClick={() => scrollToSection('schedule')} className="text-foreground hover:text-primary transition-colors">Расписание турниров</button>
              <button onClick={() => scrollToSection('results')} className="text-foreground hover:text-primary transition-colors">Результаты</button>
              <button onClick={() => scrollToSection('awards')} className="text-foreground hover:text-primary transition-colors">Награды</button>
              <button onClick={() => scrollToSection('contacts')} className="text-foreground hover:text-primary transition-colors">Контакты</button>
            </div>
            
            <div className="flex items-center space-x-4">
              <Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">Войти</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px] max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Регистрация в центре "Мир шахмат"</DialogTitle>
                    <DialogDescription>
                      Заполните форму для регистрации юного шахматиста
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Tabs defaultValue="register" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login">Вход</TabsTrigger>
                      <TabsTrigger value="register">Регистрация</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="login" className="space-y-4">
                      <form onSubmit={handleLogin}>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="loginEmail">Электронная почта</Label>
                            <Input 
                              id="loginEmail" 
                              type="email" 
                              placeholder="your@email.com"
                              value={loginForm.email}
                              onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="loginPassword">Пароль</Label>
                            <Input 
                              id="loginPassword" 
                              type="password"
                              value={loginForm.password}
                              onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                              required
                            />
                          </div>
                          <Button type="submit" className="w-full">Войти</Button>
                        </div>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="register" className="space-y-4">
                      <form onSubmit={handleRegister}>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2 col-span-2">
                            <Label htmlFor="regFullName">ФИО ребенка *</Label>
                            <Input 
                              id="regFullName" 
                              placeholder="Иванов Иван Иванович"
                              value={registerForm.fullName}
                              onChange={(e) => setRegisterForm(prev => ({ ...prev, fullName: e.target.value }))}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="regBirthDate">Дата рождения *</Label>
                            <Input 
                              id="regBirthDate" 
                              type="date"
                              value={registerForm.birthDate}
                              onChange={(e) => setRegisterForm(prev => ({ ...prev, birthDate: e.target.value }))}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="regFsrId">ID ФШР *</Label>
                            <Input 
                              id="regFsrId" 
                              placeholder="123456"
                              value={registerForm.fsrId}
                              onChange={(e) => setRegisterForm(prev => ({ ...prev, fsrId: e.target.value }))}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2 col-span-2">
                            <Label htmlFor="regInstitution">Образовательное учреждение *</Label>
                            <Input 
                              id="regInstitution" 
                              placeholder="МБОУ СОШ №1"
                              value={registerForm.institution}
                              onChange={(e) => setRegisterForm(prev => ({ ...prev, institution: e.target.value }))}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2 col-span-2">
                            <Label htmlFor="regCoach">ФИО тренера *</Label>
                            <Input 
                              id="regCoach" 
                              placeholder="Петров Петр Петрович"
                              value={registerForm.coach}
                              onChange={(e) => setRegisterForm(prev => ({ ...prev, coach: e.target.value }))}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="regEmail">Электронная почта *</Label>
                            <Input 
                              id="regEmail" 
                              type="email" 
                              placeholder="parent@email.com"
                              value={registerForm.email}
                              onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="regPhone">Телефон представителя *</Label>
                            <Input 
                              id="regPhone" 
                              placeholder="+7 (999) 123-45-67"
                              value={registerForm.phone}
                              onChange={(e) => setRegisterForm(prev => ({ ...prev, phone: e.target.value }))}
                              required
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="regPassword">Пароль *</Label>
                            <Input 
                              id="regPassword" 
                              type="password"
                              value={registerForm.password}
                              onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                              required
                              minLength={6}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="regConfirmPassword">Подтвердите пароль *</Label>
                            <Input 
                              id="regConfirmPassword" 
                              type="password"
                              value={registerForm.confirmPassword}
                              onChange={(e) => setRegisterForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                              required
                              minLength={6}
                            />
                          </div>
                        </div>
                        
                        <Button type="submit" className="w-full mt-4">Зарегистрироваться</Button>
                      </form>
                      <p className="text-sm text-muted-foreground text-center">
                        После регистрации на указанную почту будет отправлено письмо для подтверждения
                      </p>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
              <Button>Регистрация</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-br from-primary/5 to-secondary/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6">
              Центр поддержки детского шахматного спорта
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-secondary mb-4">
              "Мир шахмат"
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
              Развиваем стратегическое мышление, воспитываем чемпионов. 
              Присоединяйтесь к нашему сообществу юных шахматистов!
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" onClick={() => setIsRegisterOpen(true)}>
                <Icon name="UserPlus" size={20} className="mr-2" />
                Записаться на занятия
              </Button>
              <Button variant="outline" size="lg" onClick={() => scrollToSection('schedule')}>
                <Icon name="Calendar" size={20} className="mr-2" />
                Расписание турниров
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="schedule" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Расписание турниров</h2>
            <p className="text-lg text-muted-foreground">Предстоящие соревнования и мероприятия</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Открытый турнир 'Дебют'",
                date: "15 февраля 2025",
                category: "До 10 лет",
                prize: "Кубки и медали",
                status: "Регистрация открыта"
              },
              {
                title: "Первенство города",
                date: "2-3 марта 2025",
                category: "До 12 лет",
                prize: "Денежные призы",
                status: "Скоро регистрация"
              },
              {
                title: "Шахматный фестиваль",
                date: "20-22 апреля 2025",
                category: "Все возрасты",
                prize: "Дипломы",
                status: "Планируется"
              }
            ].map((tournament, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Icon name="Trophy" size={20} className="mr-2 text-accent" />
                    {tournament.title}
                  </CardTitle>
                  <CardDescription>{tournament.date}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p><strong>Категория:</strong> {tournament.category}</p>
                    <p><strong>Призы:</strong> {tournament.prize}</p>
                    <p className="text-sm text-accent font-medium">{tournament.status}</p>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Результаты</h2>
            <p className="text-lg text-muted-foreground">Достижения наших учеников</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Последние турниры</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Иванов Алексей", place: "1 место", tournament: "Турнир 'Зима-2024'" },
                    { name: "Петрова Мария", place: "2 место", tournament: "Кубок города" },
                    { name: "Сидоров Михаил", place: "3 место", tournament: "Открытый турнир" }
                  ].map((result, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                      <div>
                        <p className="font-semibold">{result.name}</p>
                        <p className="text-sm text-muted-foreground">{result.tournament}</p>
                      </div>
                      <span className="text-accent font-bold">{result.place}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Статистика</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Всего учеников:</span>
                    <span className="font-bold text-primary">156</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Призеров в этом году:</span>
                    <span className="font-bold text-accent">42</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Проведено турниров:</span>
                    <span className="font-bold text-secondary">18</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Средний рейтинг:</span>
                    <span className="font-bold text-primary">1285</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Awards Section */}
      <section id="awards" className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Награды</h2>
            <p className="text-lg text-muted-foreground">Наши достижения и успехи</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "Medal",
                title: "Лучший тренерский состав",
                description: "Региональная награда 2024",
                color: "text-yellow-600"
              },
              {
                icon: "Award",
                title: "Центр года",
                description: "Областная федерация шахмат",
                color: "text-blue-600"
              },
              {
                icon: "Crown",
                title: "15 чемпионов",
                description: "Воспитанники - призеры областных турниров",
                color: "text-purple-600"
              }
            ].map((award, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <Icon name={award.icon as any} size={48} className={`mx-auto mb-4 ${award.color}`} />
                  <h3 className="text-xl font-semibold mb-2">{award.title}</h3>
                  <p className="text-muted-foreground">{award.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contacts Section */}
      <section id="contacts" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Контакты</h2>
            <p className="text-lg text-muted-foreground">Свяжитесь с нами</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Контактная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" size={20} className="text-accent" />
                  <span>г. Москва, ул. Шахматная, д. 15</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Phone" size={20} className="text-accent" />
                  <span>+7 (495) 123-45-67</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" size={20} className="text-accent" />
                  <span>info@мир-шахмат.рф</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Clock" size={20} className="text-accent" />
                  <span>Пн-Вс: 9:00 - 21:00</span>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Напишите нам</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContact} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactName">Имя *</Label>
                      <Input 
                        id="contactName" 
                        placeholder="Ваше имя"
                        value={contactForm.name}
                        onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactPhone">Телефон</Label>
                      <Input 
                        id="contactPhone" 
                        placeholder="+7 (999) 123-45-67"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="contactEmail">Email *</Label>
                    <Input 
                      id="contactEmail" 
                      type="email" 
                      placeholder="your@email.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactMessage">Сообщение *</Label>
                    <Textarea 
                      id="contactMessage" 
                      placeholder="Ваше сообщение..." 
                      rows={4}
                      value={contactForm.message}
                      onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    <Icon name="Send" size={16} className="mr-2" />
                    Отправить сообщение
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Центр "Мир шахмат"</h3>
              <p className="text-primary-foreground/80">
                Развиваем талант, воспитываем характер, создаем будущих чемпионов.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Быстрые ссылки</h4>
              <div className="space-y-2">
                <button onClick={() => scrollToSection('schedule')} className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Расписание турниров
                </button>
                <button onClick={() => scrollToSection('results')} className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Результаты
                </button>
                <button onClick={() => scrollToSection('awards')} className="block text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                  Награды
                </button>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Социальные сети</h4>
              <div className="flex space-x-4">
                <Button variant="ghost" size="sm" className="text-primary-foreground hover:text-primary-foreground/80">
                  <Icon name="Instagram" size={20} />
                </Button>
                <Button variant="ghost" size="sm" className="text-primary-foreground hover:text-primary-foreground/80">
                  <Icon name="Facebook" size={20} />
                </Button>
                <Button variant="ghost" size="sm" className="text-primary-foreground hover:text-primary-foreground/80">
                  <Icon name="Youtube" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
            <p className="text-primary-foreground/60">
              © 2025 Центр поддержки детского шахматного спорта "Мир шахмат". Все права защищены.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;