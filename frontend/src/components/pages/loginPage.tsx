import React, { useState } from 'react';
import travelImg from '../../assets/images/travel.png';
import foodImg from '../../assets/images/food.png';
import artImg from '../../assets/images/art.png';
import natureImg from '../../assets/images/nature.png';
import styles from '../css/loginPage.module.css';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const navigate = useNavigate();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // UX Feedback states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleTabChange = (registerMode: boolean) => {
    setIsRegistering(registerMode);
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Simple validations
    if (isRegistering && !name.trim()) {
      setError('Por favor, preencha o seu nome.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Por favor, insira um e-mail válido.');
      return;
    }
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    setLoading(true);

    // Simulate API request
    setTimeout(async () => {
      setLoading(false);
      if (isRegistering) {
        const sucesso = await registrar();
        if(sucesso){
          setSuccess('Conta criada com sucesso! Redirecionando para login...');
          setTimeout(() => {
            setIsRegistering(false);
            setSuccess(null);
            setPassword('');
            navigate("/");
          }, 2000);
        }
      } 
      else {
        const sucesso = await login();
        if(sucesso){
          setSuccess('Login realizado com sucesso! Bem-vindo de volta.');
          setTimeout(() => {
            navigate('/home');
          }, 2000);
        }
      }
    }, 1500);
  };

  async function registrar(){
    console.log(name);
    const user = await fetch("http://localhost:3000/user/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: name,
        email,
        password
      })
    })

    const data = await user.json();
    setError(data.message);

    if (user.status === 200) {
      return true;
    }
    return false;
  }

  async function login(){
    const user = await fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          })
        })
    const data = await user.json();

    if (user.status === 200) {
      localStorage.setItem("token", data.token);
      return true;
    }
    setError(data.message);
    return false;
  }

  return (
    <div className={styles.loginPageContainer}>
      {/* Visual Collage Panel (Pinterest-like Grid) */}
      <div className={styles.loginVisualPanel}>
        <div className={styles.collageGrid}>
          {/* Column 1 */}
          <div className={styles.collageColumn}>
            <div className={styles.pinCard}>
              <div className={styles.pinImageWrapper}>
                <img src={travelImg} alt="Viagem" className={styles.pinImage} />
                <span className={styles.pinTag}>Viagem</span>
              </div>
              <div className={styles.pinDetails}>
                <p className={styles.pinCaption}>Cabana aconchegante nas montanhas de pinheiros 🌲</p>
                <div className={styles.pinAuthor}>
                  <div className={styles.authorAvatar} style={{ backgroundColor: '#2a9d8f', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '10px', fontWeight: 'bold' }}>NL</div>
                  <span className={styles.authorName}>@nature_lover</span>
                </div>
              </div>
            </div>

            <div className={styles.pinCard}>
              <div className={styles.pinImageWrapper}>
                <img src={artImg} alt="Decoração" className={styles.pinImage} />
                <span className={styles.pinTag}>Design</span>
              </div>
              <div className={styles.pinDetails}>
                <p className={styles.pinCaption}>Minimalismo em tons terrosos 🏺</p>
                <div className={styles.pinAuthor}>
                  <div className={styles.authorAvatar} style={{ backgroundColor: '#e9c46a', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '10px', fontWeight: 'bold' }}>DD</div>
                  <span className={styles.authorName}>@decor_design</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2 */}
          <div className={styles.collageColumn}>
            <div className={styles.pinCard}>
              <div className={styles.pinImageWrapper}>
                <img src={foodImg} alt="Comida" className={styles.pinImage} />
                <span className={styles.pinTag}>Gastronomia</span>
              </div>
              <div className={styles.pinDetails}>
                <p className={styles.pinCaption}>Brunch de domingo: abacate, café e boa luz 🥑☕</p>
                <div className={styles.pinAuthor}>
                  <div className={styles.authorAvatar} style={{ backgroundColor: '#e76f51', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '10px', fontWeight: 'bold' }}>FL</div>
                  <span className={styles.authorName}>@foodie_life</span>
                </div>
              </div>
            </div>

            <div className={styles.pinCard}>
              <div className={styles.pinImageWrapper}>
                <img src={natureImg} alt="Natureza" className={styles.pinImage} />
                <span className={styles.pinTag}>Explorar</span>
              </div>
              <div className={styles.pinDetails}>
                <p className={styles.pinCaption}>Montanhas e névoa no nascer do sol 🏔️</p>
                <div className={styles.pinAuthor}>
                  <div className={styles.authorAvatar} style={{ backgroundColor: '#264653', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '10px', fontWeight: 'bold' }}>WD</div>
                  <span className={styles.authorName}>@wanderer</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Form Panel */}
      <div className={styles.loginFormPanel}>
        <div className={styles.formCard}>
          <div className={styles.brandHeader}>
            <div className={styles.logoContainer}>
              {/* Custom Pin Logo Icon */}
              <svg className={styles.logoIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <h1 className={styles.brandName}>LookIn</h1>
            <p className={styles.brandTagline}>Descubra, inspire-se e compartilhe suas melhores fotos com legendas criativas.</p>
          </div>

          {/* Form Selector Tab */}
          <div className={styles.tabSwitcher}>
            <button 
              className={`${styles.tabBtn} ${!isRegistering ? styles.active : ''}`}
              onClick={() => handleTabChange(false)}
              type="button"
            >
              Entrar
            </button>
            <button 
              className={`${styles.tabBtn} ${isRegistering ? styles.active : ''}`}
              onClick={() => handleTabChange(true)}
              type="button"
            >
              Criar conta
            </button>
          </div>

          {/* Error and Success Alerts */}
          {error && (
            <div className={`${styles.alertMessage} ${styles.error}`}>
              <svg className={styles.socialIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              {error}
            </div>
          )}

          {success && (
            <div className={`${styles.alertMessage} ${styles.success}`}>
              <svg className={styles.socialIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {success}
            </div>
          )}

          {/* Auth Form */}
          <form className={styles.authForm} onSubmit={handleSubmit}>
            {isRegistering && (
              <div className={styles.formGroup}>
                <label className={styles.inputLabel} htmlFor="name">NOME DE USUÁRIO</label>
                <div className={styles.inputWrapper}>
                  <input
                    type="text"
                    id="name"
                    className={styles.formInput}
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required={isRegistering}
                    disabled={loading}
                  />
                  {/* User Icon */}
                  <svg className={styles.inputIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </div>
            )}

            <div className={styles.formGroup}>
              <label className={styles.inputLabel} htmlFor="email">E-MAIL</label>
              <div className={styles.inputWrapper}>
                <input
                  type="email"
                  id="email"
                  className={styles.formInput}
                  placeholder="exemplo@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
                {/* Mail Icon */}
                <svg className={styles.inputIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.inputLabel} htmlFor="password">SENHA</label>
              <div className={styles.inputWrapper}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className={styles.formInput}
                  placeholder="Min. 6 caracteres"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
                {/* Lock Icon */}
                <svg className={styles.inputIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                {/* Show/Hide Password Eye Button */}
                <button
                  type="button"
                  className={styles.inputToggleBtn}
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Esconder senha' : 'Mostrar senha'}
                >
                  {showPassword ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '18px', height: '18px' }}>
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ width: '18px', height: '18px' }}>
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Extra Options */}
            {!isRegistering && (
                <div className={styles.formOptions}>
                <label className={styles.rememberMe}>
                    <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={loading}
                    />
                    Lembrar de mim
                </label>
                {!isRegistering && (
                    <a href="#forgot" className={styles.forgotPasswordLink} onClick={(e) => { e.preventDefault(); setError('Simulação de recuperação enviada ao e-mail informado.'); }}>
                    Esqueceu a senha?
                    </a>
                )}
                </div>
            )}

            {/* Submit Button */}
            <button 
              type="submit" 
              className={`${styles.submitBtn} ${isRegistering ? styles.registering : ''}`}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className={styles.spinner}></div>
                  <span>Processando...</span>
                </>
              ) : (
                <span>{isRegistering ? 'Criar Conta' : 'Entrar na Conta'}</span>
              )}
            </button>
          </form>

          {/* Social Divider */}
          <div className={styles.divider}>ou continue com</div>

          {/* Social Login Button */}
          <div className={styles.socialButtons}>
            <button 
              className={styles.socialBtn} 
              type="button" 
              onClick={() => { setError(null); setSuccess('Simulando Login com a conta Google...'); }}
              disabled={loading}
            >
              {/* Google Brand Icon */}
              <svg className={styles.socialIcon} viewBox="0 0 24 24">
                <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.54 14.98 0 12 0 7.35 0 3.37 2.67 1.44 6.56l3.87 3a7.18 7.18 0 0 1 6.69-4.52z" />
                <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.34H12v4.45h6.46a5.5 5.5 0 0 1-2.39 3.63l3.7 2.87c2.16-2 3.72-4.94 3.72-8.61z" />
                <path fill="#FBBC05" d="M5.31 14.44a7.16 7.16 0 0 1 0-4.88l-3.87-3A11.96 11.96 0 0 0 0 12c0 2.01.5 3.9 1.44 5.56l3.87-3.12z" />
                <path fill="#34A853" d="M12 24c3.24 0 5.97-1.07 7.96-2.91l-3.7-2.87c-1.03.69-2.34 1.1-4.26 1.1-3.45 0-6.37-2.33-7.41-5.46l-3.87 3A11.94 11.94 0 0 0 12 24z" />
              </svg>
              <span>Entrar com o Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}