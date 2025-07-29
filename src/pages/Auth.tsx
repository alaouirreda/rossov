import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from '@/hooks/use-toast';

const Auth: React.FC = () => {
  const { user, signIn, signUp, loading } = useAuth();
  const { language, t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [signInForm, setSignInForm] = useState({ email: '', password: '' });
  const [signUpForm, setSignUpForm] = useState({ email: '', password: '', confirmPassword: '' });

  // Redirect if already authenticated
  if (user && !loading) {
    return <Navigate to="/" replace />;
  }

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { error } = await signIn(signInForm.email, signInForm.password);
      
      if (error) {
        setError(
          language === 'ar' ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة' :
          language === 'fr' ? 'Email ou mot de passe incorrect' :
          'Invalid email or password'
        );
      } else {
        toast({
          title: language === 'ar' ? 'تم تسجيل الدخول بنجاح' : language === 'fr' ? 'Connexion réussie' : 'Successfully signed in',
          description: language === 'ar' ? 'مرحباً بك في RossoVerde' : language === 'fr' ? 'Bienvenue dans RossoVerde' : 'Welcome to RossoVerde'
        });
      }
    } catch (err) {
      setError(
        language === 'ar' ? 'حدث خطأ أثناء تسجيل الدخول' :
        language === 'fr' ? 'Une erreur s\'est produite lors de la connexion' :
        'An error occurred during sign in'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Password confirmation check
    if (signUpForm.password !== signUpForm.confirmPassword) {
      setError(
        language === 'ar' ? 'كلمات المرور غير متطابقة' :
        language === 'fr' ? 'Les mots de passe ne correspondent pas' :
        'Passwords do not match'
      );
      setIsLoading(false);
      return;
    }

    // Password length check
    if (signUpForm.password.length < 6) {
      setError(
        language === 'ar' ? 'كلمة المرور يجب أن تكون 6 أحرف على الأقل' :
        language === 'fr' ? 'Le mot de passe doit contenir au moins 6 caractères' :
        'Password must be at least 6 characters'
      );
      setIsLoading(false);
      return;
    }

    try {
      const { error } = await signUp(signUpForm.email, signUpForm.password);
      
      if (error) {
        if (error.message.includes('already registered')) {
          setError(
            language === 'ar' ? 'هذا البريد الإلكتروني مسجل مسبقاً' :
            language === 'fr' ? 'Cet email est déjà enregistré' :
            'This email is already registered'
          );
        } else {
          setError(
            language === 'ar' ? 'حدث خطأ أثناء التسجيل' :
            language === 'fr' ? 'Une erreur s\'est produite lors de l\'inscription' :
            'An error occurred during sign up'
          );
        }
      } else {
        toast({
          title: language === 'ar' ? 'تم إنشاء الحساب بنجاح' : language === 'fr' ? 'Compte créé avec succès' : 'Account created successfully',
          description: language === 'ar' ? 'تحقق من بريدك الإلكتروني لتأكيد الحساب' : language === 'fr' ? 'Vérifiez votre email pour confirmer votre compte' : 'Check your email to confirm your account'
        });
      }
    } catch (err) {
      setError(
        language === 'ar' ? 'حدث خطأ أثناء التسجيل' :
        language === 'fr' ? 'Une erreur s\'est produite lors de l\'inscription' :
        'An error occurred during sign up'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin w-8 h-8 border-4 border-primary border-t-transparent rounded-full mx-auto"></div>
          <p className={language === 'ar' ? 'font-arabic' : ''}>{t('common.loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4 moroccan-pattern">
      <div className="container mx-auto max-w-md">
        <div className="text-center mb-8">
          <img src="/logo.png" alt="RossoVerde" className="h-16 w-16 mx-auto mb-4" />
          <h1 className={`text-3xl font-bold gradient-text ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 'مرحباً بك في RossoVerde' : language === 'fr' ? 'Bienvenue dans RossoVerde' : 'Welcome to RossoVerde'}
          </h1>
          <p className={`text-muted-foreground mt-2 ${language === 'ar' ? 'font-arabic' : ''}`}>
            {language === 'ar' ? 'انضم إلى عائلة مشجعي أسود الأطلس' : language === 'fr' ? 'Rejoignez la famille des supporters des Lions de l\'Atlas' : 'Join the Atlas Lions supporters family'}
          </p>
        </div>

        <Card className="glass-effect">
          <CardHeader>
            <CardTitle className={`text-center ${language === 'ar' ? 'font-arabic' : ''}`}>
              {language === 'ar' ? 'تسجيل الدخول' : language === 'fr' ? 'Connexion' : 'Authentication'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin" className={language === 'ar' ? 'font-arabic' : ''}>
                  {language === 'ar' ? 'تسجيل الدخول' : language === 'fr' ? 'Connexion' : 'Sign In'}
                </TabsTrigger>
                <TabsTrigger value="signup" className={language === 'ar' ? 'font-arabic' : ''}>
                  {language === 'ar' ? 'إنشاء حساب' : language === 'fr' ? 'Inscription' : 'Sign Up'}
                </TabsTrigger>
              </TabsList>

              {error && (
                <Alert className="mt-4">
                  <AlertDescription className={language === 'ar' ? 'font-arabic' : ''}>
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <TabsContent value="signin" className="mt-6">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email" className={language === 'ar' ? 'font-arabic' : ''}>
                      {language === 'ar' ? 'البريد الإلكتروني' : language === 'fr' ? 'Email' : 'Email'}
                    </Label>
                    <Input
                      id="signin-email"
                      type="email"
                      value={signInForm.email}
                      onChange={(e) => setSignInForm({ ...signInForm, email: e.target.value })}
                      placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : language === 'fr' ? 'Entrez votre email' : 'Enter your email'}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signin-password" className={language === 'ar' ? 'font-arabic' : ''}>
                      {language === 'ar' ? 'كلمة المرور' : language === 'fr' ? 'Mot de passe' : 'Password'}
                    </Label>
                    <Input
                      id="signin-password"
                      type="password"
                      value={signInForm.password}
                      onChange={(e) => setSignInForm({ ...signInForm, password: e.target.value })}
                      placeholder={language === 'ar' ? 'أدخل كلمة المرور' : language === 'fr' ? 'Entrez votre mot de passe' : 'Enter your password'}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full btn-morocco" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                        <span className={language === 'ar' ? 'font-arabic' : ''}>
                          {language === 'ar' ? 'جاري تسجيل الدخول...' : language === 'fr' ? 'Connexion...' : 'Signing in...'}
                        </span>
                      </div>
                    ) : (
                      <span className={language === 'ar' ? 'font-arabic' : ''}>
                        {language === 'ar' ? 'تسجيل الدخول' : language === 'fr' ? 'Se connecter' : 'Sign In'}
                      </span>
                    )}
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup" className="mt-6">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className={language === 'ar' ? 'font-arabic' : ''}>
                      {language === 'ar' ? 'البريد الإلكتروني' : language === 'fr' ? 'Email' : 'Email'}
                    </Label>
                    <Input
                      id="signup-email"
                      type="email"
                      value={signUpForm.email}
                      onChange={(e) => setSignUpForm({ ...signUpForm, email: e.target.value })}
                      placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : language === 'fr' ? 'Entrez votre email' : 'Enter your email'}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className={language === 'ar' ? 'font-arabic' : ''}>
                      {language === 'ar' ? 'كلمة المرور' : language === 'fr' ? 'Mot de passe' : 'Password'}
                    </Label>
                    <Input
                      id="signup-password"
                      type="password"
                      value={signUpForm.password}
                      onChange={(e) => setSignUpForm({ ...signUpForm, password: e.target.value })}
                      placeholder={language === 'ar' ? 'أدخل كلمة المرور (6 أحرف على الأقل)' : language === 'fr' ? 'Entrez votre mot de passe (min 6 caractères)' : 'Enter password (min 6 characters)'}
                      required
                      minLength={6}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-confirm-password" className={language === 'ar' ? 'font-arabic' : ''}>
                      {language === 'ar' ? 'تأكيد كلمة المرور' : language === 'fr' ? 'Confirmer le mot de passe' : 'Confirm Password'}
                    </Label>
                    <Input
                      id="signup-confirm-password"
                      type="password"
                      value={signUpForm.confirmPassword}
                      onChange={(e) => setSignUpForm({ ...signUpForm, confirmPassword: e.target.value })}
                      placeholder={language === 'ar' ? 'أعد إدخال كلمة المرور' : language === 'fr' ? 'Répétez votre mot de passe' : 'Repeat your password'}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full btn-morocco" disabled={isLoading}>
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
                        <span className={language === 'ar' ? 'font-arabic' : ''}>
                          {language === 'ar' ? 'جاري إنشاء الحساب...' : language === 'fr' ? 'Création du compte...' : 'Creating account...'}
                        </span>
                      </div>
                    ) : (
                      <span className={language === 'ar' ? 'font-arabic' : ''}>
                        {language === 'ar' ? 'إنشاء حساب' : language === 'fr' ? 'Créer un compte' : 'Create Account'}
                      </span>
                    )}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="text-center mt-8 text-sm text-muted-foreground">
          <p className={language === 'ar' ? 'font-arabic' : ''}>
            {language === 'ar' ? 
              'بإنشاء حساب، فإنك توافق على شروط الخدمة وسياسة الخصوصية الخاصة بنا.' :
              language === 'fr' ? 
              'En créant un compte, vous acceptez nos conditions de service et notre politique de confidentialité.' :
              'By creating an account, you agree to our terms of service and privacy policy.'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;